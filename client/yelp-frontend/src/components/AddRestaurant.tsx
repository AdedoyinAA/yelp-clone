import React from 'react'

const AddRestaurant = () => {
  return (
    <div className="mb-4">
        <form action="">
            <div className="form-row d-flex">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Restaurant Name"/>
                </div>
                <div className="col mx-2">
                    <input type="text" className="form-control" placeholder="Address"/>
                </div>
                <div className="col mx-2">
                    <select className="form-select mr-sm-2 align-self-center">
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button className="btn btn-primary ml-2">Add</button>
            </div>
        </form>

    </div>
  )
}

export default AddRestaurant