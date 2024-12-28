import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

enum ConfirmationState {
  LOADING,
  SUCCESS,
  ERROR,
}

interface ConfirmAccountProps {
  token: string;
}

const ConfirmAccount: React.FC<ConfirmAccountProps> = ({ token }) => {
  const [state, setState] = useState<ConfirmationState>(
    ConfirmationState.LOADING
  );

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await axios.post("http://localhost:8000/confirm/", {
          token,
        });
        if (response.status === 200) {
          setState(ConfirmationState.SUCCESS);
        } else {
          throw new Error("Unexpected response");
        }
      } catch (error) {
        console.error("Error during confirmation:", error);
        setState(ConfirmationState.ERROR);
      }
    };

    confirmAccount();
  }, [token]);

  const renderContent = () => {
    switch (state) {
      case ConfirmationState.LOADING:
        return (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-center">Confirmando Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </CardContent>
            <CardDescription className="text-center pb-4">
              Por favor espere mientras confirmamos su cuenta...
            </CardDescription>
          </Card>
        );
      case ConfirmationState.SUCCESS:
        return (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-center text-green-600">
                ¡Cuenta Confirmada!
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <CardDescription className="text-center">
                Su cuenta ha sido confirmada exitosamente. Ahora puede iniciar
                sesión y comenzar a usar nuestros servicios.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <a href="/login">Iniciar Sesión</a>
              </Button>
            </CardFooter>
          </Card>
        );
      case ConfirmationState.ERROR:
        return (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-center text-red-600">
                Error de Confirmación
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <CardDescription className="text-center">
                Lo sentimos, hubo un problema al confirmar su cuenta. Por favor,
                intente nuevamente o contacte a soporte.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild variant="outline">
                <a href="/">Volver al Inicio</a>
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {renderContent()}
    </div>
  );
}

export default ConfirmAccount;