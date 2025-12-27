package com.codewithkrish.Employee.Service;

import com.codewithkrish.Employee.Repository.EmployeeRepository;
import com.codewithkrish.Employee.entity.Employee;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee postEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id) {
        if(!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Employee with Id " + id + " not found");
        }

        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id){
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee updateEmployee(Long id, Employee employee){
        Optional<Employee> optionalEmployee=employeeRepository.findById(id);
        if(optionalEmployee.isPresent()) {
            Employee existingemployee = optionalEmployee.get();

            existingemployee.setEmail(employee.getEmail());
            existingemployee.setName(employee.getName());
            existingemployee.setPhone(employee.getPhone());
            existingemployee.setDepartment(employee.getDepartment());

            return employeeRepository.save(existingemployee);
        }
        return null;
    }
}
