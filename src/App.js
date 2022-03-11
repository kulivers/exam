import './App.css';
import {useState} from "react";

const App = () => {
    const [, setText] = useState('');
    const [updatedText, setUpdatedText] = useState('');
    return (
        <div className="App">
            <header className="App-header">
                <div style={{maxWidth: 600}}>
                    <textarea onChange={(e) => {
                        setText(e.target.value)
                        setUpdatedText(e.target.value.replaceAll('т.к.', 'так как'))
                    }} style={{height: '200px', width: '600px', overflowWrap: 'break-word'}}/>

                    <br/>
                    <p style={{
                        height: '300px', overflowWrap: 'break-word'
                    }}>{updatedText}</p>
                </div>
            </header>
        </div>
    );
}

export default App;
