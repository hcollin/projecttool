import { IText } from "@frosttroll/projecttoolmodels";

export const DEFAULT_TEXTS_FI: IText[] = [
    {
        guid: "default-text-java-openjdk-spring-fi",
        organizationId: "default-org",
        content:
            "Java on alun perin Sun Microsystemsin kehittämä ja nykyisin Oraclen ylläpitämä teknologiaympäristö. Java kieli vaatii toimiakseen Java virtuaalikoneen (Java Virtual Machine eli JVM), jonka avulla lähdekoodista käännettyä binäärikoodia ajetaan. JVM ajoympäristöjä on useita, joista osa on kaupallisia ja osa avoimia. Javan referenssitoteutus ja ajoympäristö on avoimen lähdekoodin OpenJDK, jota myös tämän hankkeen toteuttamisessa hyödynnetään.\n\nJärjestelmän taustapalveluiden teknologiavalinnoissa valinnassa on päädytty ratkaisuun, joka perustuu pääosiltaan Javateknologiaan ja Spring Boot palvelukehykseen. Tämä mahdollistaa taustajärjestelmien alustariippumattomuuden, eli taustajärjestelmää voidaan suorittaa erilaisilla laitteisto- ja ohjelmisto alustoilla tuotannossa, huolimatta siitä missä ympäristöllä varsinainen kehitys on tehty. Java ekosysteemi on yleisesti käytössä web-pohjaisten sovellusten taustajärjestelmänä, joten sille löytyy hyvin sekä kehittäjiä että laajasti käytössä olevia avoimen lähdekoodin kirjastoja ja sovellus kehyksiä. Java Spring boot taas on avoimen lähdekoodin sovelluskehys, joka on suunniteltu yksinkertaistamaan kehitys prosessia Java Spring-sovelluksille. Spring- ekosysteemi on suosittu ja se on laajasti käytössä Javakehitysyhteisössä.",
        keywords: ["java", "openjdk", "technology", "backend", "general"],
        name: "OpenJDK ja Java Spring Boot",
        language: "fi",
        langlinks: {
            en: "default-text-java-openjdk-spring-en",
        },
    },

    {
        guid: "default-text-react-typescript-frontend-en",
        organizationId: "default-org",
        content:
            "TypeScript is a modern programming language developed and maintained by Microsoft. It builds on JavaScript by adding static typing and advanced language features, which help developers catch errors early and write more maintainable code. TypeScript code is compiled to standard JavaScript, ensuring compatibility with all major browsers and JavaScript environments.\n\nFor the frontend of this system, the React library has been selected alongside TypeScript. React is an open-source JavaScript library created by Meta (Facebook) for building user interfaces, especially single-page applications. It enables the creation of interactive and dynamic web applications with reusable components, improving development efficiency and code organization. The combination of TypeScript and React is widely adopted in the web development community, offering strong tooling, a large ecosystem of libraries, and a robust developer community. This approach ensures a scalable, maintainable, and high-performance frontend architecture.",
        keywords: ["react", "typescript", "technology", "frontend", "general"],
        name: "React and TypeScript Frontend",
        language: "en",
        langlinks: {
            fi: "default-text-react-typescript-frontend-fi",
        },
    },

    {
        guid: "default-text-acceptance-process-fi",
        organizationId: "default-org",

        content:
            "Tilaajan tuoteomistaja ja/tai hänen valtuuttamansa henkilö hyväksyy kehitystyön tulokset. Työn suunnitteluvaiheessa käydään läpi hyväksymiskriteerit ja toteutus tehdään kattamaan nämä hyväksymiskriteerit. Kriteerit ja niiden hyväksyminen dokumentoidaan kyseisille Jira-tiketeille (toimittajan projektinhallintajärjestelmä). Projektin tuotoksina valmistuvat dokumentit hyväksyvät Tilaajan tuoteomistaja tai hänen valtuuttama henkilö. Projektin valmiiksi hyväksyy ohjausryhmä.\n\nTilaajan suorittama hyväksymistestaus tehdään, kun testaukseen sovittu kokonaisuus on valmistunut ja Toimittajan testausvaiheet ovat suoritettuina. Hyväksymistestaus dokumentteineen on Tilaajan vastuulla. Toimittaja avustaa tehtävässä tarvittaessa ja erikseen sopien.\n\nHyväksymistestauksen huomiot kirjataan yhteisesti sovitulla tavalla, esimerkiksi Jiraan. Testattavalle Jira-tiketille kirjataan mahdollinen testaushavainto ja sen edellyttämät liitteet. Kehittäjä korjaa virheet ja virheiden korjausjärjestyksen tekemiseen osallistuu myös Tilaajan edustaja, esimerkiksi Tuoteomistaja ja testausvastuullinen. Hyväksymistestauksen tarkempi aikataulutus tehdään projektipäälliköiden toimesta, kun kehitystyö on edennyt.",
        keywords: ["acceptance", "process", "general", "management", "Hyväksymismenettely"],
        name: "Hyväksymismenettely",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-scrum-fi",
        organizationId: "default-org",
        content:
            "<p>Scrum-menetelmä on ketterä projektinhallintamenetelmä. Scrum-kehys korostaa tiimityöskentelyä, tiivistä ja suoraa kommunikointia tiimin jäsenten kesken sekä joustavuutta sopeutua nopeasti muutoksiin. Scrumin tavoitteena on parantaa tuottavuutta, toimittaa korkealaatuisia ohjelmistotuotteita ja palveluja ja lieventää ongelmia, jotka saattavat haitata projektin etenemistä.</p><p>Scrum-projektissa työ jaetaan kiinteän pituisiksi sprinteiksi, jotka kestävät tyypillisesti kahdesta viikosta yhteen kuukauteen. Projektin vaatimukset kerätään projektin työjonoon (backlog), joka on priorisoitu luettelo halutuista toiminnallisuuksista tai tuotoksista. Jokaisen sprintin alussa tiimi pitää suunnittelupalaverin valitakseen joukon käyttäjätarinoita tai tehtäviä työjonosta työskenneltäväksi sprintin aikana.</p><p>Scrum-tiimi koostuu kolmesta roolista: tuoteomistajasta, joka edustaa sidosryhmiä ja liiketoiminnan etuja, scrum masterista, joka helpottaa prosessia ja pyrkii poistamaan tiimin mahdollisesti kohtaamat esteet, ja kehitystiimistä, joka on vastuussa tuotteen osien toimittamisesta. Päivittäisillä Scrum-kokouksilla, tuttavallisemmin dailyt, seurataan edistymistä, keskustellaan haasteista ja suunnitellaan työtä seuraavalle 24 tunnille. Jokaisen sprintin lopussa tiimi tarkastelee valmistunutta työtä ja tarkentaa suunnitelmia seuraavaa sprinttiä varten.</p>",
        keywords: ["scrum", "agile", "methodology", "management", "projectplan"],
        name: "Scrum-menetelmä",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-scrum-increment-fi",
        organizationId: "default-org",
        content:
            "<p>Tässä projektissa Inkrementti viittaa vahvemmin vastaavaan kokonaisuuteen kuin tuoteinkrementti (PI eli Product Increment) termi SaFe kehitysmallissa, kuin Scrumin omaan inkrementtiin.</p><p>Inkrementti on aikajakso, joka kestää yleensä 8-12 viikkoa, jonka sen aikana toimitetaan lisääntyvää arvoa työskentelyn ja testatun ohjelmiston muodossa. PI-vaiheen alussa tiimit kokoontuvat PI-suunnittelutapahtumassa määrittämään tavoitteet ja asettamaan tiekartan tulevalle inkrementeille. Tämä vaihe on tärkeä tiimin suuntaamiseksi yhteiseen tavoitteeseen Tilaajan kanssa ja luo selkeän vision ja tavoitteen toimitettavasta kokonaisuudesta inkrementin päätteeksi.</p><p>Ohjelmistoprojektin ollessa vasta alkuvaiheessa, Safe Product Increment viittaa ohjelmiston alkuperäiseen versioon, jolla ei ehkä ole kaikkia ominaisuuksia, mutta joka on silti täysin testattu, toimiva ja mahdollisesti esiteltävissä Tilaajalla. Inkrementti ymmärretään samalla tavalla myös tämän projektin aikana, vaikka SaFe mallia ei suoraan siihen sovelletakaan. Vaikka projekti onkin vasta alkuvaiheessaan, inkrementin odotetaan olevan käyttökelpoisessa kunnossa sen lopuksi. Se sisältää kaikki vaiheen 1 aikana valmiiksi saadut määritykset ja pohjatyöt, jotka luovat perustan jatkokehitykselle ja parannuksille sprinttien ja tulevien inkrementtien aikana.</p><p>Projektin edetessä inkrementti jatkaa viittaamista ohjelmistoversioon, joka on täysin testattu, toimiva ja joka voidaan mahdollisesti toimittaa asiakkaalle. Se on summa kaikista sprinttien aikana ja kaikissa aikaisemmissa sprinteissä ja inkrementeissa valmiiksi saaduista projektin toiminnallisuuksista. Inkrementin pitäisi olla käyttökelpoisessa kunnossa riippumatta siitä, otetaanko se tuotantokäyttöön.</p><pPääsyyt inkremettien käyttämiseen projektissa liittyvät määrittelyyn, ajankäyttöön ja suunnitelmallisuuteen. Määrittelytyöt inkrementin alussa tehdään kasvotusten ja suurempi kokonaisuus huomioiden ja sprinttien aikana tapahtuma määrittely ja backlogin tarkennukset liittyvät enemmän jo aikaisemmin sovittuun sisältöön. Tämä helpottaa myös suunnitelmallisuutta, kun todennäköisyys sisällön suuremmat muutokset eivät ole niin todennäköisiä jokaisen sprinttin vaihtuessa vaan keskittyvät inkrementtien määrittely vaiheeseen (PI suunnittelu).</p>",
        keywords: ["scrum", "agile", "increments", "management", "projectplan"],
        name: "Inkrementit osana Scrum menetelmää",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-agile-playbook-fi",
        organizationId: "default-org",
        content:
            "<p>Cinia on kehittänyt ketterän kehityksen toimintamallejaan ja prosesseja sekä jalkauttanut niitä valmennuksin kehitysprojekteissa työskenteleville. Yhteisesti sovitut säännöt ja käytänteet on kiteytetty Playbook:n muotoon.</p><p>Playbook määrittelee suuntaviivat kaikille Cinian projekteille, lähtien vision kirkastamisesta sekä DoR:sta (Definition of Ready) ja DoD:sta (Definition of Done) päättyen siihen, mitä asioita tulee huomioida ja saattaa valmiiksi, kun toteutettuja järjestelmiä siirtyy tuotantoon ja jatkuvien ylläpitopalveluiden piiriin. Cinian kehittäjät ovat sitoutuneita noudattamaan Playbookin käytänteitä. Sääntöjä ja käytänteitä tarkennetaan tarvittaessa asiakaskohtaiset tarpeet ja vaatimukset huomioiden.</p><p>Playbookin mukaisesti projektille määritellään ”quality gatet”, joilla varmistetaan, että lopputulos vastaa mahdollisimman tarkasti Tilaajan vaatimuksia. Esimerkiksi kehitysjonon osalta Definition of Ready määrittelee kullekin käyttäjätarinalle hyväksyntäkriteerit, joiden on täytyttävä ennen kuin käyttäjätarina voidaan ottaa toteutukseen. Definition of Done puolestaan määrittelee hyväksyntäkriteerit sille, että käyttäjätarina voidaan katsoa toteutetuksi. Playbook:n ja sitä tukevien ohjeistusten lisäksi Cinialla on valittu kehitystyötä tukemaan nykyaikaiset työkalut, joiden avulla sekä yhteisten käytäntöjen tukema tiimit pystyvät keskittymään täysipainoisesti tuotteen kehittämiseen.</p>",
        keywords: ["agile", "playbook", "methodology", "management", "projectplan"],
        name: "Agile Projects Playbook",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-steering-group-fi",
        organizationId: "default-org",
        content:
            "<p>Projektin ylin päättävä elin on kaikkien osapuolten edustajien muodostama ohjausryhmä, joka kokoontuu säännöllisesti. Hyväksi käytännöksi on osoittautunut ohjausryhmän kokoontuminen noin kerran kuussa, mutta määrästä ja frekvenssistä sovitaan tarkemmin projektin aloitusvaiheessa. Ohjausryhmän tehtävänä on tunnistaa mahdolliset muutostarpeet, ja käyttää riittävää päätäntävaltaa muutosten tekemiseksi, ettei projektin aikataulu tai budjetti vaarannu (kts. 3.4 Muutostenhallinta). Osapuolilta tulee osallistua ohjausryhmän kokouksiin henkilöt, jotka voivat tarvittaessa tehdä projektin sisältöön sekä talouteen liittyviä päätöksiä. Ohjausryhmä voi kokoontua ylimääräiseen kokoukseen kenen tahansa osapuolen aloitteesta, mikäli joku kiireinen asia vaatii päätöstä.</p><p>Toimittajan projektipäällikkö valmistelee ohjausryhmän kokousten esityslistan ja lähettää ne osallistujille ennen kokousta. Ohjausryhmän esityslistalla ovat:</p><p></p><ol><li><p>Ohjausryhmän järjestäytyminen ja työskentelytavoista sopiminen (ensimmäisessä kokouksessa)</p></li><li><p>Ohjausryhmän edellisessä kokouksessa sovittujen toimenpiteiden edistymisen seuranta</p></li><li><p>Projektin kokonaistilanteen läpikäynti</p></li><li><p>Edistyminen suhteessa projektisuunnitelmaan ja aikatauluun</p></li><li><p>Projektin työmäärät (tehty, tekemättä) sekä talous ja laskutus</p></li><li><p>Riskiarvion läpikäynti (tarvittaessa)</p></li><li><p>Ongelmat ja niiden ratkaisuehdotukset</p></li><li><p>Molemminpuolinen palaute projektityöskentelystä</p></li><li><p>Yhteenveto ohjausryhmän tekemistä päätöksistä ja sovituista toimenpiteistä</p></li></ol><p></p>",
        keywords: ["management", "projectplan", "steeringgroup"],
        name: "Projektin ohjausryhmä",
        language: "fi",
        langlinks: {},
    },

    // ROLES
    {
        guid: "default-text-role-projectmanager-fi",
        organizationId: "default-org",
        content:
            "<p>Projektipäällikön vastuulla projektissa on projektin johtaminen. Projektipäällikkö vastaa vaatimusten- sekä muutoksenhallinnasta ja projektidokumentaatiosta. Projektipäällikkö valvoo projektin suunnittelua ja toteutusta varmistaen sen valmistumisen ajoissa, budjetin puitteissa ja laatuvaatimusten mukaisesti. Projektipäällikkö osallistuu tiimin ketterään työskentelyyn ja tukee hallinnollisia rooleja työn ohjauksessa tarkoituksenmukaisella tavalla. Projektipäällikkö vastaa projektin tilannekuvan (aikataulu, budjetti ja eteneminen, riskit) päivittämisestä ja kommunikoinnista sidosryhmille. Hän valmistelee ohjausryhmän kokoukset.</p>",
        keywords: ["role", "projectplan", "projectmanager", "default"],
        name: "Projektipäällikkö",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-role-uxdesigner-fi",
        organizationId: "default-org",
        content:
            "<p>Käyttöliittymäsuunnittelija keskittyy käyttäjäkokemuksen suunnitteluun, jotta tuote tai palvelu vastaa käyttäjän tarpeita ja ehdotuksia. Hän tarvitsee vahvat käyttäjäkeskeiset suunnittelutaidot, luovuutta ja kyvyn tehdä käyttäjätutkimusta. Hänen on myös ymmärrettävä, miten ihmiset vuorovaikuttavat teknologian kanssa ja kuinka suunnitella käyttäjäystävällisiä tuotteita</p>",
        keywords: ["role", "uxdesigner", "default"],
        name: "Käyttöliittymäsuunnittelija",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-role-softwarearchitect-fi",
        organizationId: "default-org",
        content:
            "<p>Ohjelmistoarkkitehti suunnittelee järjestelmän ohjelmistoarkkitehtuurin, määrittäen sen rakenteen, käyttäytymisen ja vuorovaikutuksen muiden järjestelmien kanssa. Hänen on tunnettava syvällisesti ohjelmistokehityksen periaatteet ja teknologiat sekä kyettävä suunnittelemaan tehokkaita, ylläpidettäviä ja luotettavia ohjelmistoarkkitehtuureja. Ongelmanratkaisu- ja päätöksentekotaidot ovat myös olennaisia tähän rooliin.</p>",
        keywords: ["role", "default", "softwarearchitect"],
        name: "Ohjelmistoarkkitehti",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-role-leaddeveloper-fi",
        organizationId: "default-org",
        content:
            "<p>Vastaava ohjelmistokehittäjä työskentelee sekä sovellusten taustapalveluiden, että käyttöliittymien parissa suunnitellen käyttöliittymiä ja rakentaen palvelin-, verkkoliikenne- ja tietokantatoimintoja. Hän tarvitsee laajan osaamisen ohjelmointikielistä, kehitystyökaluista ja -menetelmistä sekä kyvyn ymmärtää ja toteuttaa koko sovelluspinon vaatimukset.</p>",
        keywords: ["role", "developer", "leaddeveloper", "default"],
        name: "Vastaava ohjelmistokehittäjä",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-role-testautomationdeveloper-fi",
        organizationId: "default-org",
        content:
            "<p>Testiautomaatiokehittäjä suunnittelee, toteuttaa ja ylläpitää automatisoituja testejä varmistaen ohjelmiston laadun ja suorituskyvyn. Hän tarvitsee vahvat taidot ohjelmoinnissa, testausmenetelmissä ja testiautomaatiotyökaluissa sekä kyvyn tunnistaa ja ratkaista ohjelmistovirheitä automatisoidusti. Automatisoidun testauksen lisäksi testiautomaatio kehittäjä tekee tarvittaessa myös manuaalista testausta.</p>",
        keywords: ["role", "qa", "testautomationdeveloper", "test", "testautomation", "default"],
        name: "Testiautomaatiokehittäjä",
        language: "fi",
        langlinks: {},
    },
    {
        guid: "default-text-role-scrummaster-fi",
        organizationId: "default-org",
        content:
            "<p>Scrum Master ohjaa tiimiä käyttämään scrum-menetelmää tehokkaasti, poistaa esteitä ja edistää tiimin itseorganisoitumista ja jatkuvaa parantamista. Hän tarvitsee syvällisen ymmärryksen scrum-menetelmästä, vahvat viestintä- ja neuvottelutaidot sekä kyvyn toimia muutosagenttina.</p>",
        keywords: ["role", "scrum", "scurmmaster", "default"],
        name: "Scrum Master",
        language: "fi",
        langlinks: {},
    },
];
