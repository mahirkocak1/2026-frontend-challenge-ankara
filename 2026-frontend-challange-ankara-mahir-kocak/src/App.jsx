import { useState, useEffect } from 'react'
import './styles/App.css';
import Record from "./components/Record.jsx"
import Person from "./components/Person.jsx"
import RecordDetails from './components/RecordDetails.jsx'
import SummaryPanel from './components/SummaryPanel.jsx'
const API_KEY = "5fae2808d995376ed63dd3ae7731e0c2"; 

const FORM_URLS = {
  checkins: `https://api.jotform.com/form/261065067494966/submissions?apiKey=${API_KEY}`,
  messages: `https://api.jotform.com/form/261065765723966/submissions?apiKey=${API_KEY}`,
  sightings: `https://api.jotform.com/form/261065244786967/submissions?apiKey=${API_KEY}`,
  notes: `https://api.jotform.com/form/261065509008958/submissions?apiKey=${API_KEY}`,
  tips: `https://api.jotform.com/form/261065875889981/submissions?apiKey=${API_KEY}`,
};

function App() {
  const [loadingState, setLoadingState] = useState(false)
  const [errorState, setErrorState] = useState(false)
  const [allRecords, setAllRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [selectedPerson,setSelectedPerson] = useState(null);
  const extractData = (answers, keyword) => {
    if (!answers) return "Bilinmiyor";
    const foundKey = Object.keys(answers).find(key => 
      answers[key].text && answers[key].text.toLowerCase().includes(keyword.toLowerCase())
    );
    return foundKey && answers[foundKey].answer ? answers[foundKey].answer : null;
  };

  useEffect(() => {
    async function getAllData() {
      try {
        setLoadingState(true);  
        const [checkinsRes, messagesRes, sightingsRes, notesRes, tipsRes] = await Promise.all([
          fetch(FORM_URLS.checkins),
          fetch(FORM_URLS.messages),
          fetch(FORM_URLS.sightings),
          fetch(FORM_URLS.notes),
          fetch(FORM_URLS.tips)
        ]);

        if (!checkinsRes.ok || !messagesRes.ok || !sightingsRes.ok || !notesRes.ok || !tipsRes.ok) {
          throw new Error("An error occured while trying to fetch data!");
        }
 
        const checkinsData = await checkinsRes.json();
        const messagesData = await messagesRes.json();
        const sightingsData = await sightingsRes.json();
        const notesData = await notesRes.json();
        const tipsData = await tipsRes.json();

        const parseRecords = (dataArray, typeIcon, typeName) => {
          return (dataArray || []).map(item => ({
            id: item.id,
            typeIcon,
            typeName,
            person: extractData(item.answers, "person") || extractData(item.answers, "name") || "Unknown Person",
            location: extractData(item.answers, "location") || extractData(item.answers, "place") || "Unknown Location",
            time: extractData(item.answers, "time") || item.created_at,
            details: extractData(item.answers, "note") || extractData(item.answers, "message") 
            || extractData(item.answers, "tip") || extractData(item.answers, "content") 
            || extractData(item.answers, "text") || "No content.",
            rawData: item
          }));
        };

        const combinedRecords = [
          ...parseRecords(checkinsData.content, "📍", "Check-in"),
          ...parseRecords(messagesData.content, "💬", "Message"),
          ...parseRecords(sightingsData.content, "👁️", "Sighting"),
          ...parseRecords(notesData.content, "📝", "Personal Note"),
          ...parseRecords(tipsData.content, "🕵️", "Anonymous Tip")
        ];

        combinedRecords.sort((a, b) => new Date(b.time) - new Date(a.time));
        console.log(combinedRecords)
        setAllRecords(combinedRecords);
 
      } catch(err) {
        console.error(err);
        setErrorState(true);
      } finally {
        setLoadingState(false);
      }
    }
    getAllData();

  }, [])
  //Filter the records using person name, location or the contents of the 
  const filteredRecords = allRecords.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.person.toLowerCase().includes(searchLower) ||
      record.location.toLowerCase().includes(searchLower) ||
      record.details.toLowerCase().includes(searchLower)
    );

  });
  const selectedPersonRecords = selectedPerson 
    ? allRecords.filter(record => record.person === selectedPerson)
    : [];
  function handleGoBackToHome(){
    setSelectedPerson(null);
    setSelectedRecord(null); //Go back to home page
  }
  function handleGoBackToPerson() {
    setSelectedRecord(null); // Only close the record details while we inspecting a profile of a person
  }
return (
    <div className="app-container">
      <h1 className="title-header" onClick={handleGoBackToHome}>
        🐾 Missing Podo: Ankara Case
      </h1>
      
      {loadingState && <h3 style={{ textAlign: "center" }}>🕵️‍♂️ Gathering intelligence...</h3>}
      {errorState && <h3 style={{ color: "red", textAlign: "center" }}>❌ Database connection failed!</h3>}
      
      {!loadingState && !errorState && allRecords.length > 0 && (
        <>          
          {selectedRecord ? (
            <RecordDetails 
              record={selectedRecord} 
              handleGoBack={selectedPerson ? handleGoBackToPerson : handleGoBackToHome} 
            />
          ) : selectedPerson ? (
            <Person 
              personName={selectedPerson} 
              records={selectedPersonRecords} 
              handleGoBack={handleGoBackToHome}
              onSelectRecord={setSelectedRecord} 
            />
          ) : (
            <>
              <SummaryPanel records={allRecords}/>

              <div style={{ marginBottom: "20px" }}>
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="🔍 Search by person, location or clue..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <p>Total {filteredRecords.length} records found.</p>

              <div className="record-list">
                {filteredRecords.map(record => (
                  <Record 
                    key={record.id} 
                    record={record} 
                    onSelectPerson={setSelectedPerson}
                    onSelectRecord={setSelectedRecord}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App