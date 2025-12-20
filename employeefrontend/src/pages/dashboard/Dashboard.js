import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [employees, SetEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json();

                SetEmployees(data);
                
            } catch (error) {
                console.log("Error Fetching Data" + error.message);
                
            }
        }

        fetchEmployees();
    },[])

    const handleDelete = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`,{
                method : "DELETE",
            });

            if(response.ok){
                SetEmployees((prevEmployees) =>
                    prevEmployees.filter((employee) => employee.id !== employee.id)
                )
            }

            console.log(`Employee with id ${employeeId} deleted sucessfully`);
        } catch (error) {
            console.log("Error Deleting Employee ",error.message)
        }
    }

    const handleUpdate = (employeeId)=>{
        navigate(`/employee/${employeeId}`);
    }

    return(
        <>
        <Container>
            <Row>
                <Col>
                <h1 className="text-center">Employees</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={()=>handleUpdate(employee.id)}>Update</Button>{" "}
                                        <Button variant="outline-danger" onClick={()=>handleDelete(employee.id)}>DELETE</Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard;