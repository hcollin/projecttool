import { Controller, Get, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiQuery } from "@nestjs/swagger";
import { TextDto } from "./text.dto";
import { TextsService } from "./texts.service";

@Controller("texts")
export class TextsController {
    constructor(private textsService: TextsService) {}
    @Get()
    async getTextList(): Promise<TextDto[]> {
        const res = await this.textsService.getTextList();
        return res;
    }

    @Get("search")
    @ApiQuery({
        name: "keywords",
        type: String,
        description: "Keywords string where each keyword is separated by a comma.",
    })
    @ApiQuery({
        name: "lang",
        type: String,
        required: false,
        description: "Language code to filter texts by language.",
    })
    async getTextsByKeywords(@Query("keywords") keywords: string, @Query("lang") lang: string): Promise<TextDto[]> {
        if (!keywords) {
            throw new Error("No keywords provided for search.");
        }
        const keys = keywords.split(",").map((k) => k.trim().toLowerCase());
        if (keys.length === 0) {
            throw new Error("No valid keywords provided for search.");
        }

        const res = await this.textsService.getTextsByKeywords(keys, lang);
        return res;
    }

    @Get(":guid")
    async getTextByGuid(@Query("guid") guid: string, @Res() res: Response): Promise<TextDto | void> {
        if (!guid) {
            throw new Error("No GUID provided for search.");
        }
        try {
            const results = await this.textsService.getTextByGuid(guid);
            if (results === null) {
                res.status(404).send(`Text with GUID ${guid} not found.`);
                return Promise.resolve();
            }
            res.status(200).send(results);
            return Promise.resolve(results);
        } catch (error) {
            res.status(500).send(`Error retrieving text with GUID ${guid}: ${error as string}`);
        }
    }
}
