import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = ["Datos del Propietario", "Información del Negocio"];

interface OwnerData {
  rut: string;
  name: string;
  lastname: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface ShopData {
  name: string;
  description: string;
}

interface FormData {
  owner: OwnerData;
  shop: ShopData;
}

export default function RegistrationStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    owner: {
      rut: "",
      name: "",
      lastname: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    shop: {
      name: "",
      description: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (currentStep === 0) {
      setFormData((prev) => ({
        ...prev,
        owner: { ...prev.owner, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        shop: { ...prev.shop, [name]: value },
      }));
    }
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Input
              placeholder="RUT"
              name="rut"
              value={formData.owner.rut}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Nombre"
              name="name"
              value={formData.owner.name}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Apellido"
              name="lastname"
              value={formData.owner.lastname}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Número de Teléfono"
              name="phone_number"
              value={formData.owner.phone_number}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Correo Electrónico"
              name="email"
              type="email"
              value={formData.owner.email}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Contraseña"
              name="password"
              type="password"
              value={formData.owner.password}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Confirmar Contraseña"
              name="confirm_password"
              type="confirm_password"
              value={formData.owner.confirm_password}
              onChange={handleInputChange}
            />
          </>
        );
      case 1:
        return (
          <>
            <Input
              placeholder="Nombre del Negocio"
              name="name"
              value={formData.shop.name}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Textarea
              placeholder="Descripción del Negocio"
              name="description"
              value={formData.shop.description}
              onChange={handleInputChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/shop/",
        formData
      );
      console.log("Registration successful:", response.data);
      alert(
        "¡Registro completado con éxito! Por favor, revisa tu correo electrónico para confirmar tu cuenta."
      );
      window.location.href = "/greetings";
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Hubo un error en el registro. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep]}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">{renderStepContent()}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0}>
          Anterior
        </Button>
        <Button
          onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
        >
          {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </CardFooter>
    </Card>
  );
}
