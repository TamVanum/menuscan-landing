import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const steps = ['Propietarios', 'Empleados', 'Información del Negocio'];

export default function RegistrationStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    owners: [{ name: '', email: '' }],
    employees: [{ name: '', position: '' }],
    businessName: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number, field?: string) => {
    const { name, value } = e.target;
    if (currentStep === 0 || currentStep === 1) {
      setFormData(prev => ({
        ...prev,
        [currentStep === 0 ? 'owners' : 'employees']: prev[currentStep === 0 ? 'owners' : 'employees'].map((item, i) => 
          i === index ? { ...item, [field!]: value } : item
        )
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addPerson = () => {
    if (currentStep === 0) {
      setFormData(prev => ({ ...prev, owners: [...prev.owners, { name: '', email: '' }] }));
    } else if (currentStep === 1) {
      setFormData(prev => ({ ...prev, employees: [...prev.employees, { name: '', position: '' }] }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            {formData.owners.map((owner, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder="Nombre del propietario"
                  value={owner.name}
                  onChange={(e) => handleInputChange(e, index, 'name')}
                />
                <Input
                  placeholder="Email del propietario"
                  type="email"
                  value={owner.email}
                  onChange={(e) => handleInputChange(e, index, 'email')}
                />
              </div>
            ))}
            <Button onClick={addPerson} variant="outline" className="mt-2">Añadir Propietario</Button>
          </>
        );
      case 1:
        return (
          <>
            {formData.employees.map((employee, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder="Nombre del empleado"
                  value={employee.name}
                  onChange={(e) => handleInputChange(e, index, 'name')}
                />
                <Input
                  placeholder="Cargo del empleado"
                  value={employee.position}
                  onChange={(e) => handleInputChange(e, index, 'position')}
                />
              </div>
            ))}
            <Button onClick={addPerson} variant="outline" className="mt-2">Añadir Empleado</Button>
          </>
        );
      case 2:
        return (
          <>
            <Input
              placeholder="Nombre del Negocio"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Descripción del Negocio"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-2"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep]}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {renderStepContent()}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0}>Anterior</Button>
        <Button onClick={currentStep === steps.length - 1 ? () => console.log(formData) : nextStep}>
          {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </CardFooter>
    </Card>
  );
}

