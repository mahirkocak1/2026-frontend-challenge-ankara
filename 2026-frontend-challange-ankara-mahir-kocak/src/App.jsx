import { useState, useEffect } from 'react'
import './App.css'

const API_KEY = "54a934fa20b1ccc3a5bd1d2076f90556"; 

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
  const [formData, setFormData] = useState({
    checkins: [],
    messages: [],
    sightings: [],
    notes: [],
    tips: []
  }); 


useEffect(()=>{
  async function getAllData(){
  try{
    setLoadingState(true);  
    const [checkinsRes, messagesRes, sightingsRes, notesRes, tipsRes] = await Promise.all([
          fetch(FORM_URLS.checkins),
          fetch(FORM_URLS.messages),
          fetch(FORM_URLS.sightings),
          fetch(FORM_URLS.notes),
          fetch(FORM_URLS.tips)
        ]);
    if (!checkinsRes.ok || !messagesRes.ok 
      || !sightingsRes.ok || !notesRes.ok || !tipsRes.ok) throw new Error("An error occured while trying to fetch data!");
 
        const checkinsData = await checkinsRes.json();
        const messagesData = await messagesRes.json();
        const sightingsData = await sightingsRes.json();
        const notesData = await notesRes.json();
        const tipsData = await tipsRes.json();

        const fetchedData = {
          checkins: checkinsData.content || [],
          messages: messagesData.content || [],
          sightings: sightingsData.content || [],
          notes: notesData.content || [],
          tips: tipsData.content || []
        };
        setFormData(fetchedData);
        setLoadingState(false)
    }     
  catch(err){
    throw new Error("Something went wrong!")
    setErrorState(true)
  }}
getAllData()
},[])

console.log(formData)

return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🐾 Missing Podo: Ankara Case</h1>
      
      {loadingState && <h3>🕵️‍♂️  Loading...</h3>}
      {errorState && <h3 style={{color: "red"}}>❌ An error occured!</h3>}
      
      {!loadingState && !errorState && formData.checkins.length > 0 && (
        <div style={{ background: "#f0fdf4", padding: "15px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
          <h2>Fetching Data Successful!</h2>
          <p>Records:</p>
          <ul>
            <li>📍 Check-ins: {formData.checkins.length}</li>
            <li>💬 messages: {formData.messages.length}</li>
            <li>👁️  sghthings: {formData.sightings.length}</li>
          </ul>
        </div>
      )}
    </div>
  )
}
export default App
