import { render, screen, fireEvent } from "@testing-library/react";
import App from "./Checklist";

test("agrega y cuenta tareas pendientes", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/nueva tarea/i);
  const button = screen.getByText(/agregar/i);

  fireEvent.change(input, { target: { value: "Aprender React" } });
  fireEvent.click(button);

  expect(screen.getByText("Aprender React")).toBeInTheDocument();
  expect(screen.getByText(/tareas pendientes: 1/i)).toBeInTheDocument();
});

test("marca tarea como completada y actualiza el contador", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/nueva tarea/i);
  const button = screen.getByText(/agregar/i);

  fireEvent.change(input, { target: { value: "Hacer pruebas" } });
  fireEvent.click(button);

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  expect(screen.getByText(/tareas pendientes: 0/i)).toBeInTheDocument();
});