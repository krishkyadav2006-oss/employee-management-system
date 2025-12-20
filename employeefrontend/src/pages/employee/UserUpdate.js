import { useEffect, useState } from "react";
import "./UserUpdate.css"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const UserUpdate = () =>{
    const{id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      useEffect(() => {
        const fetchEmployees = async () =>{
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`)
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.log("Error fetching data" ,error.message);
            }
        }

        fetchEmployees();
      },[id])

      const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`,{
                method: "PATCH",
                headers:{
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify(formData),
            })

            const data = await response.json();
            console.log("User Updated ",data);

            navigate("/");
        } catch (error) {
            console.log("Error Updating User",error.message);
        }
      }
    
    return (
        <div className="center-form">
      <h1>Edit Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter Your Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDepartment">
          <Form.Control
            type="text"
            name="department"
            placeholder="Enter Your Department"
            value={formData.department}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Update Employee
        </Button>
      </Form>
    </div>
    )
}

export default UserUpdate;