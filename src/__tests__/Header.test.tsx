import {render, screen} from '@testing-library/react'
import {Header} from "../Components/Header/Header";
import {beforeEach, describe, expect, test, vi} from "vitest";
import userEvent from '@testing-library/user-event';
import {ErrorBoudary} from "../Components/ErrorBoudary/ErrorBoudary.tsx";

describe("header tests", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    })

    test("render search input", () => {
        render(
            <Header handleSearch={vi.fn()} searchQuery={''}/>
        )

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    test("save item in local storage", async () => {
        const user = userEvent.setup();
        render(
            <Header handleSearch={vi.fn()} searchQuery={''}/>
        )

        const input = screen.getByPlaceholderText(/Search pokemons/i);
        const button = screen.getByRole('button', {name: /search/i})

        await user.type(input, 'pikachu');
        await user.click(button)

        expect(localStorage.getItem('input-value')).toBe("pikachu")
    })

    test("works error boudary test", async () => {
        const user = userEvent.setup();

        render(
            <ErrorBoudary>
                <Header handleSearch={vi.fn()} searchQuery={''}/>
            </ErrorBoudary>
        )

        const errButton = screen.getByRole('button', {name: 'Generate Error'})

        await user.click(errButton)
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })

    test("localstorage load value test", ()=>{
        localStorage.setItem('input-value', 'pikachu')

        render(
            <Header handleSearch={vi.fn()} searchQuery={"pikachu"}/>
        )

        const value = screen.getByDisplayValue('pikachu')

        expect(value).toBeInTheDocument()
    })
})