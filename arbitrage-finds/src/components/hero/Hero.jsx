import React, { useState } from 'react'
import { errors } from 'web3';


const Hero = () => {
    const [considerFees, setConsiderFees] = useState("True");
    const [arbitrage, setArbitrage] = useState({});
    const arbitrageView = async(event) => {
        try{
            event.preventDefault();
            const baseCurr = document.querySelector("#baseCurr").value
            const quoteCurr = document.querySelector("#quoteCurr").value
            const dex = document.querySelector("#dex").value
            if(baseCurr == quoteCurr){
                throw new Error("Base Currency and Quote Currency cannot be the same");
            }
            const url = `https://crypto-arbitrage.p.rapidapi.com/crypto-arb?pair=${baseCurr}%2F${quoteCurr}&consider_fees=${considerFees}&selected_exchanges=${dex}`;
            // const url = 'https://crypto-arbitrage.p.rapidapi.com/crypto-arb?pair=BTC%2FUSD&consider_fees=False&selected_exchanges=exmo%20cex%20bitstamp%20hitbtc';
            // exmo cex bitstamp hitbtc
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '<<Your API Key of https://rapidapi.com/WRT/api/crypto-arbitrage/>>',
                    'X-RapidAPI-Host': 'crypto-arbitrage.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setArbitrage(result);
                console.log(result);
                // const consoleResult = await response.text();
                // console.log(consoleResult);
            } catch (error) {
                alert("Error: " + error.message);
            }
        }
        catch(error){
            alert("Error: " + error.message);
        }
    } 
  return (
    <>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md">
            <form onSubmit={arbitrageView}>
                <div className="mb-4">
                    <input type="text" id="baseCurr" className="border rounded-full px-4 py-2 w-full" placeholder='Base Currency Symbol' required />
                </div>
                <div className="mb-4">
                    <input type="text" id="quoteCurr" className="border rounded-full px-4 py-2 w-full" placeholder='Quote Currency Symbol' required />
                </div>
                <div className="mb-4">
                    <input type="text" id="dex" className="border rounded-full px-4 py-2 w-full" placeholder='DEX SYM (e.g., exmo cex bitstamp hitbtc)' required />
                </div>
                <div className="mb-4">
                    <label>
                        Consider Fees:
                        <input type="radio" name="considerFees" value="true" defaultChecked onChange={() => setConsiderFees("True")} /> True
                    </label>
                    <label className="ml-4">
                        <input type="radio" name="considerFees" value="false" onChange={() => setConsiderFees("False")} /> False
                    </label>
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">Get Arbitrage</button>
                </div>
            </form>
        </div>
        <div className="mt-8">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Key</th>
                        <th className="px-4 py-2">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(arbitrage).map(([key, value]) => (
                        <tr key={key}>
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2">{JSON.stringify(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Hero