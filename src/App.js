import './App.css';
import React, { useEffect, useState } from 'react'

export default function App() {
  let [users, setUsers] = useState([])
  const [search, setsearch] = useState("")
  const [addData, setAddData] = useState([])
  const [sum, setSum] = useState(0)
  let [ser, setser] = useState([])
  let [change, setchange] = useState(true)
  let [invoice, setinvoice] = useState(true)
  let fetchData = async () => {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
    let result = await response.json()
    setUsers(result.meals)

  }

  useEffect(() => {
    fetchData()
  }, [])


  function searchCategory() {
    let searchData = []
    for (var i of users) {
      if (i.strCategory === search || i.strMeal===search) {
        searchData.push(i)

      }
    }
   
    setser(searchData)
    setsearch("")
  }

  return (
    <div>
      <div className='navbar'>
        <img className="salad" src="https://www.themealdb.com/images/logo-small.png" alt="" />
        <button className='Home' onClick={() => {
          setchange(true)
          setinvoice(false)
        }}>Home</button>
        
         <button className='invoice_btn' onClick={() => {
          setchange(false)
          setinvoice(false)
        }}>Invoice</button>
        <input className="searchbar" type="text" placeholder='Search for a Meal...' value={search} onChange={(e) => {
          setsearch(e.target.value)
        }}/>
        <button className='search' onClick={() => {
          searchCategory()
          setchange(false)
          setinvoice(true)
         
        }}>Search</button>
        
        
        
        
      </div>
       <div className='Body'>
        <div className='bowl'>
          <img src="https://www.themealdb.com/images/meal-icon.png" alt=""/>
        </div>
        <div className='content'>
          <h1 className='head'>Welcome to TheMealDB</h1>
          <span className='subhead'>Welcome to TheMealDB: An open, crowd-sourced database of Recipes from around the world.</span><br />
          <span className='subhead1'>We also offer a <span style={{color:"orange"}}>free JSON API</span> for anyone wanting to use it, with additional features for subscribers.</span><br />
          <button id="pay"><i><span style={{color:"blue"}}><b>Pay</b></span><span style={{color:"aquamarine"}}><b>Pal</b></span></i> Subscribe</button>
          <p style={{ "marginLeft": "150px","marginTop":"1px" }}>Click to Support $2 per month(cancel anytime) </p>
          <p style={{ "marginLeft": "250px" }}>Currently 50 Supporters</p>
        </div> 
        <div className='bowl'>
            <img src="https://www.themealdb.com/images/meal-icon.png" alt=""/>
        </div>
      </div>

       <div className='App'>
        {change ? users.map((user, index) => {
          return (
            <div key={index} className="data">
              <img src={user.strMealThumb} style={{ "width": "250px", "height": "250px","marginTop":"6px" }} alt="" /><br />
              <h2 style={{ color: 'orange' }}>{user.strMeal}</h2>
              <p style={{ "color": "white" }}><b>{user.strCategory}</b></p>
              <p><b>$500</b></p>
              <button onClick={() => {
                setAddData([...addData, { Name: user.strMeal, Price: 500 }])
                setSum(sum + 500)
              }} id="add"><b>Add</b></button>
              
            </div>
          )
        })
          : invoice?
          ser.map((item, index) => {
            return (
              <div key={index}>
                <img src={item.strMealThumb} style={{ "width": "250px", "height": "250px","marginTop":"6px" }} alt="" /><br />
                <h2 style={{ "color": 'orange' }}>{item.strMeal}</h2>
                <p style={{ "color": "white" }}><b>{item.strCategory}</b></p>
                <p><b>$500</b></p>
                <button onClick={() => {
                  setAddData([...addData, { Name: item.strMeal, Price: 500 }])
                  setSum(sum + 500)
                }} id="add"><b>Add</b></button>
              </div>
            )

          }
          ):(() => {
            return (
              <div className='invoice'>
                <div >
                  <h1 style={{ "color": "rgb(45,32,19)", "fontSize": "30px","textAlign":"center" }}>Invoice</h1>
                  <hr />
                  <p><b>BILLED TO : </b>ABC Company</p>
                  <p><b>PAY TO : </b>Ishu Aggarwal</p>
                  <p>Bank: State Bank of India</p>
                  <p>Account Name: ABC</p>
                  <p>Account: 00000000000000</p>
                </div>
                <hr />
                <table>
                  <tr>
                    <th style={{ "color": "rgb(45,32,19)", "fontSize": "15px" }}>Item</th>
                    <th style={{ "color": "rgb(45,32,19)", "fontSize": "15px" }}>Amount</th>
                  </tr>
                  {
                    addData.map((item) => {
                      return (
                        <tbody>
                          <tr>
                            <td style={{ "color": "white" }}><b>{item.Name}</b></td>
                            <td style={{ "color": "white" }}><b>{item.Price}</b></td>
                          </tr>
                        </tbody>
                      )
                    })
                  }
                  <tr>
                    <th style={{ "color": "rgb(45,32,19)", "fontSize": "15px" }}>Pay Amount :</th>
                    <th style={{ "color": "black", "fontSize": "30px" }}><b>${sum}</b></th>
                  </tr>
                </table>
              </div>
            )
          })()}
    </div> 

</div>

  )
}

