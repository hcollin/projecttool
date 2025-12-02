import {
    EDOCITEMTYPE,
    IDocFileContent,
    IDocFileCover,
    IDocFileTableOfContents,
    IDocFileHeader,
} from "@frosttroll/projecttoolmodels";

export const PROJECTPLAN_TEMPLATE_SMALL_EN: IDocFileContent[] = [
    { type: EDOCITEMTYPE.COVER, title: "Project title here" } as IDocFileCover,
    { type: EDOCITEMTYPE.TABLEOFCONTENTS, maxLevel: 3 } as IDocFileTableOfContents,
    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Introduction" } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Project overview" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Version history" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Contact information" } as IDocFileHeader,

    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Project plan" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Project phases", targetingKey: "phases" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Risk & issue management", targetingKey: "risk" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "RACI matrix", targetingKey: "raci" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Project closure" } as IDocFileHeader,

    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Methods & practices" } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Scrum as delivery method", targetingKey: "scrum" } as IDocFileHeader,
    {
        type: EDOCITEMTYPE.HEADER,
        level: 3,
        text: "Increments in scrum",
        targetingKey: "incrementsInScrum",
    } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "Agile playbook", targetingKey: "agilePlaybook" } as IDocFileHeader,

    {
        type: EDOCITEMTYPE.HEADER,
        level: 2,
        text: "Quality assurance approach",
        targetingKey: "qualityAssurance",
    } as IDocFileHeader,
    {
        type: EDOCITEMTYPE.HEADER,
        level: 3,
        text: "Continous integration and test automation",
        targetingKey: "incrementsInScrum",
    } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Documentation" } as IDocFileHeader,

    {
        type: EDOCITEMTYPE.HEADER,
        level: 2,
        text: "Change & release management",
        targetingKey: "changeReleaseManagement",
    } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Communication plan" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "Collaboration tools & channels" } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Tools" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "Jira as project management tool" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 3, text: "Development environment built on Gitlab" } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Billing and budget" } as IDocFileHeader,

    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Roles and responsibilities" } as IDocFileHeader,

    {
        type: EDOCITEMTYPE.HEADER,
        level: 2,
        text: "Development team roles",
        targetingKey: "devteamroles",
    } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Client-side roles", targetingKey: "clientroles" } as IDocFileHeader,

    { type: EDOCITEMTYPE.HEADER, level: 2, text: "3rd party roles", targetingKey: "thirdpartyroles" } as IDocFileHeader,

    //============================================================
    { type: EDOCITEMTYPE.HEADER, level: 1, text: "Other matters" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Responsibility and environment" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Source IPR and Open Source" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Separate projects" } as IDocFileHeader,
    { type: EDOCITEMTYPE.HEADER, level: 2, text: "Order process for separate projects" } as IDocFileHeader,
];
