import {
    EDOCITEMTYPE,
    IDocFileContent,
    IDocFileCover,
    IDocFileTableOfContents,
    IDocFileHeader,
    IDocFileHtml,
} from "@frosttroll/projecttoolmodels";

export const PROJECTPLAN_TEMPLATE_SMALL_FI: IDocFileContent[] = [
    { type: EDOCITEMTYPE.COVER, title: "Projektin nimi tähän" } as IDocFileCover,
    { type: EDOCITEMTYPE.TABLEOFCONTENTS, maxLevel: 3 } as IDocFileTableOfContents,
    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Johdanto" } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Projektin yleiskuvaus" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Versiohistoria" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Yhteyshenkilöt" } as IDocFileHeader,

    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Projektisuunnitelma" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Projektin vaiheet", targetingKey: "phases" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Riskit ja niiden hallinta", targetingKey: "risk" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "RACI-matriisi", targetingKey: "raci" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Projektin päättäminen" } as IDocFileHeader,

    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Menetelmät ja käytänteet" } as IDocFileHeader,

    {
        type: EDOCITEMTYPE.HEADER,
        level: 2,
        text: "Scrum pääkehitysmenetelmänä",
        targetingKey: "scrum",
    } as IDocFileHeader,
    { type: EDOCITEMTYPE.HTML, key: "default-text-scrum-fi" } as IDocFileHtml,
    {
        type: EDOCITEMTYPE.HEADER,
        level: 3,
        text: "Inkrementit osana Scrum menetelmää",
        targetingKey: "incrementsInScrum",
    } as IDocFileHeader,
    { type: EDOCITEMTYPE.HTML, key: "default-text-scrum-increment-fi" } as IDocFileHtml,
    {
        type: EDOCITEMTYPE.HEADER,
        level: 3,
        text: "Agile Projects playbook",
        targetingKey: "agilePlaybook",
    } as IDocFileHeader,
    { type: EDOCITEMTYPE.HTML, key: "default-text-agile-playbook-fi" } as IDocFileHtml,
    {
        type: EDOCITEMTYPE.HEADER,
        level: 2,
        text: "Laadunvarmis",
        targetingKey: "qualityAssurance",
    } as IDocFileHeader,
    {
        type: EDOCITEMTYPE.HEADER,
        level: 3,
        text: "Jatkuva integrointi ja testiautomaatio",
        targetingKey: "incrementsInScrum",
    } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Dokumentaatio" } as IDocFileHeader,

    {
        type: EDOCITEMTYPE.HEADER,
        level: 2,
        text: "Muutostenhallinta",
        targetingKey: "changeReleaseManagement",
    } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Viestintä ja kommunikointi" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "Yhteistyövälineet ja -kanavat" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "Ohjausryhmä" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HTML, key: "default-text-steering-group-fi" } as IDocFileHtml,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Työkalut" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "Jira projektinhallintatyökaluna" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "Kehitysympäristö Gitlabin päällä" } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Laskutus ja budjetti" } as IDocFileHeader,

    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Roolit ja vastuut" } as IDocFileHeader,

    {
        type: EDOCITEMTYPE.HEADER,
        level: 2,
        text: "Kehitystiimin roolit",
        targetingKey: "devteamroles",
    } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Tilaajan roolit", targetingKey: "clientroles" } as IDocFileHeader,

    {
        type: EDOCITEMTYPE.HEADER,
        level: 2,
        text: "Kolmannen osapuolen roolit",
        targetingKey: "thirdpartyroles",
    } as IDocFileHeader,

    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Muut asiat" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Vastuullisuus ja ympäristö" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Lähdekoodin IPR oikeudet ja avoin lähdekoodi" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Erillishankkeet kehityksen päätyttyä" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Erillishankkeiden tilausprosessi" } as IDocFileHeader,
];
