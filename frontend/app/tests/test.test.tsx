import { render, fireEvent } from "@testing-library/react";
import react, { ReactElement } from "react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

describe("Home page", () => {
    // there should be a button with text "Add a Book"
    it('should have a button with text "Add book"', () => {
        const { getByText } = render(<Home />);
        expect(getByText("Add book")).toBeInTheDocument();
    });
});