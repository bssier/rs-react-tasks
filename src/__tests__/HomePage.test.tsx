import {render, screen} from '@testing-library/react'
import {beforeEach, describe, expect, test, vi} from "vitest";
import {HomePage} from "../pages/home-page/HomePage";

describe("home page test", () => {
    beforeEach(() => {
        localStorage.clear();
    })

    test("not found test", async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 404,
        } as Response))

        render(
            <HomePage query={"notpokemon"}/>
        )

        const errSpan = await screen.findByText('Not found');

        expect(errSpan).toBeInTheDocument()
    })

    test("test loading state", () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(
                () =>
                    new Promise(() => {
                    })
            )
        )

        render(
            <HomePage query={"pikachu"}/>
        )

        const loading = screen.getByText(
            /loading/i
        )

        expect(loading).toBeInTheDocument()
    })

    test("server error", async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
        } as Response))

        render(<HomePage query={'pikachu'}/>)

        const errServer = await screen.findByText(/Server error. We try fix problem, please wait/i)

        expect(errServer).toBeInTheDocument()
    })

    test("render pokemon test", async ()=>{
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                name: 'pikachu',

                sprites: {
                    front_default: '',
                },

                stats: [
                    { base_stat: 35 },
                    { base_stat: 55 },
                    { base_stat: 40 },
                    {},
                    {},
                    { base_stat: 90 },
                ],
            }),
        } as Response))

        render(
            <HomePage query={'pikachu'}/>
        )

        const pikachu = screen.findByText(/pikachu/i)

        expect(await pikachu).toBeInTheDocument()
    })

    test("not make request if query less three symbols test", ()=>{
        vi.stubGlobal('fetch', vi.fn())

        render(<HomePage query={'pic'}/>)

        expect(vi.fn()).not.toHaveBeenCalled()
    })
})