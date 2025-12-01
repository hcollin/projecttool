import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiBody, ApiParam, ApiQuery } from "@nestjs/swagger";
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
    @ApiParam({ name: "guid", type: String, description: "The GUID of the text to retrieve." })
    async getTextByGuid(@Param("guid") guid: string, @Res() res: Response): Promise<TextDto | void> {
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

    @ApiBody({ type: TextDto })
    @Post()
    async createText(@Body() textData: Partial<TextDto>): Promise<TextDto> {
        const res = await this.textsService.createText(textData);
        return res;
    }

    @ApiBody({ type: TextDto, description: "The text data to update." })
    @ApiParam({ name: "guid", type: String, description: "The GUID of the text to update." })
    @Post("/:guid")
    async updateText(@Param("guid") guid: string, @Body() textData: TextDto, @Res() res: Response): Promise<void> {
        if (!textData) {
            console.warn("No text data provided in the request body.");
            res.status(400).send("Text data is required in the body.");
            return Promise.resolve();
        }
        if (textData.guid !== guid) {
            res.status(400).send("Text GUID in the body does not match the GUID in the URL.");
            return Promise.resolve();
        }
        const updatedText = await this.textsService.updateText(guid, textData);
        res.status(200).send(updatedText);
        return Promise.resolve();
    }
}
