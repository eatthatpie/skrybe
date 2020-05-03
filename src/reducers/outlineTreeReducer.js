import actionTypes from '@/actions/types';
import caseGenerateOTNodeDescendantsReducer from './caseGenerateOTNodeDescendantsReducer'
import caseMoveDownOTNodeReducer from './caseMoveDownOTNodeReducer';
import caseMoveLeftOTNodeReducer from './caseMoveLeftOTNodeReducer';
import caseMoveRightOTNodeReducer from './caseMoveRightOTNodeReducer';
import caseMoveToOTNodeReducer from './caseMoveToOTNodeReducer';
import caseMoveUpOTNodeReducer from './caseMoveUpOTNodeReducer';
import caseRemoveOTNodeCascReducer from './caseRemoveOTNodeCascReducer';
import caseResetOTReducer from './caseResetOTReducer';
import caseSetOTNodeReducer from './caseSetOTNodeReducer';

const initialState = {
    lastId: 29,
    currentNodeId: '1',
    items:
        {"1":{"bodyText":"Po zerwaniu z dziewczyną i odrzuceniu przez kolejnego wydawcę, Czesław wyjeżdża do wielkiego miasta w poszukiwaniu sukcesu. Poznaje tam dziwnego sprzedawcę, który pomoże mu napisać pierwszą wydaną powieść. Po publikacji pisarzowi odbija -- udaje się do kościoła, gdzie próbuje spalić ołtarz.","descendants":["15","16","17"],"leadText":"🌟 Początkujący pisarz -- Czesław -- tworzy powieść, która niszczy w nim człowieka.","parentNodeId":"root","siblings":[]},"15":{"bodyText":"Dziewczyna Czesława -- Strzyga -- jest drobną manipulantką. Znudzona dwuletnim związkiem z Czesławem dziewczyna zdradza go wielokrotnie, a chłopak w końcu się o tym dowiaduje. Zdenerwowany robi demolkę w domu (byłej) dziewczyny i wyjeżdża z miasta.","descendants":["18","19","20"],"leadText":"Po zerwaniu z dziewczyną i odrzuceniu przez kolejnego wydawcę, Czesław wyjeżdża do wielkiego miasta w poszukiwaniu sukcesu.","parentNodeId":"1","siblings":["16","17","63"]},"16":{"bodyText":"Czesław mieszka w wieżowcu, u podstawy którego znajduje się mały sklep spożywczy. Sprzedający tam starszy facet -- GARSON -- poznaje w Czesławie pisarza i sugeruje, że wie, jak pomóc. Czesław uważa, że nie ma nic do stracenia. Bardzo się myli...","descendants":["21","22","23","24"],"leadText":" Poznaje tam dziwnego sprzedawcę, który pomoże mu napisać pierwszą wydaną powieść.","parentNodeId":"1","siblings":["15","17","63"]},"17":{"bodyText":"Czesław czyta komentarze na swój temat w internecie -- nie są przychylne, szczególnie te nasączone religijną ideą. Zdenerwowany pisarz wsiada w samochód i wjeżdza nim do kościoła. Szuka zapalniczki, aby spalić swój samochód i ołtarz.","descendants":["42","43","44"],"leadText":" Po publikacji pisarzowi odbija -- udaje się do kościoła, gdzie próbuje spalić ołtarz.","parentNodeId":"1","siblings":["15","16","63"]},"18":{"bodyText":"","leadText":"Dziewczyna Czesława -- Strzyga -- jest drobną manipulantką.","parentNodeId":"15","siblings":["19","20"],"descendants":[]},"19":{"bodyText":"","leadText":" Znudzona dwuletnim związkiem z Czesławem dziewczyna zdradza go wielokrotnie, a chłopak w końcu się o tym dowiaduje.","parentNodeId":"15","siblings":["18","20"],"descendants":[]},"20":{"bodyText":"","leadText":" Zdenerwowany robi demolkę w domu (byłej) dziewczyny i wyjeżdża z miasta.","parentNodeId":"15","siblings":["18","19"],"descendants":[]},"21":{"bodyText":"Wieżowiec jest stary, prawdopodobnie zbudowany chwilę po wojnie. Na parterze są typowe usługi -- fryzjer, golibroda, kiosk i sklep spożywczy. To właśnie w tym sklepie, za wiecznie brudnymi szybami, siedzi GARSON, człowiek który wkrótce zniszczy głównego bohatera.","descendants":["25","26","27"],"leadText":"Czesław mieszka w wieżowcu, u podstawy którego znajduje się mały sklep spożywczy.","parentNodeId":"16","siblings":["22","23","24"]},"22":{"bodyText":"GARSON ma spore umiejętności w ocenianiu ludzi. Od razu rozpoznaje w Czesławie pisarza. Podpowiada, że jego zmarła żona zajmowała się pisaniem i pomógł jej wydać swoją pierwszą książkę.","descendants":["28","29","30"],"leadText":" Sprzedający tam starszy facet -- GARSON -- poznaje w Czesławie pisarza i sugeruje, że wie, jak pomóc.","parentNodeId":"16","siblings":["21","23","24"]},"23":{"bodyText":"","leadText":" Czesław uważa, że nie ma nic do stracenia.","parentNodeId":"16","siblings":["21","22","24"],"descendants":[]},"24":{"bodyText":"Test!","descendants":["61"],"leadText":" Bardzo się myli.","parentNodeId":"16","siblings":["21","22","23"]},"25":{"bodyText":"","leadText":"Wieżowiec jest stary, prawdopodobnie zbudowany chwilę po wojnie.","parentNodeId":"21","siblings":["26","27"],"descendants":[]},"26":{"bodyText":"","leadText":" Na parterze są typowe usługi -- fryzjer, golibroda, kiosk i sklep spożywczy.","parentNodeId":"21","siblings":["25","27"],"descendants":[]},"27":{"bodyText":"","leadText":" To właśnie w tym sklepie, za wiecznie brudnymi szybami, siedzi GARSON, człowiek który wkrótce zniszczy głównego bohatera.","parentNodeId":"21","siblings":["25","26"],"descendants":[]},"28":{"bodyText":"Niewiele osób o tym wie, ale GARSON był w czasach PRL radzieckim szpiegiem. Całe życie uważał Rosjan za swoich braci, od momentu, kiedy w 1945 roku wpuścili go do cukierni, wyważając drzwi. W trakcie swojej kariery GARSON rozpracowywał setki osób. Jeszcze więcej skazał na śmierć, choć osobiście nikogo nie zabił.","descendants":["31","32","33","34"],"leadText":"GARSON ma spore umiejętności w ocenianiu ludzi.","parentNodeId":"22","siblings":["29","30"]},"29":{"bodyText":"GARSON dostrzega flanelową koszulę i wieczne pióro wystające z kieszonki. GARSONowi przypomina to swojego ostatniego klienta, któremu pomógł wylądować na szafocie.","descendants":["35","36"],"leadText":" Od razu rozpoznaje w Czesławie pisarza.","parentNodeId":"22","siblings":["28","30"]},"30":{"bodyText":"GARSON poznał swoją przyszłą żonę podczas wieczorka poetyckiego. W czasach PRL, korzystając ze swojej pozycji wpłynął na jednego z pomniejszych wydawców, by ten wydał słabą książkę kobiety w nakładzie 100 000 egzemplarzy. Żona GARSONa wkrótce potem zmarła.","descendants":[],"leadText":" Podpowiada, że jego zmarła żona zajmowała się pisaniem i pomógł jej wydać swoją pierwszą książkę.","parentNodeId":"22","siblings":["28","29"]},"31":{"bodyText":"","leadText":"Niewiele osób o tym wie, ale GARSON był w czasach PRL radzieckim szpiegiem.","parentNodeId":"28","siblings":["32","33","34"],"descendants":[]},"32":{"bodyText":"","leadText":" Całe życie uważał Rosjan za swoich braci, od momentu, kiedy w 1945 roku wpuścili go do cukierni, wyważając drzwi.","parentNodeId":"28","siblings":["31","33","34"],"descendants":[]},"33":{"bodyText":"","leadText":" W trakcie swojej kariery GARSON rozpracowywał setki osób.","parentNodeId":"28","siblings":["31","32","34"],"descendants":[]},"34":{"bodyText":"","leadText":" Jeszcze więcej skazał na śmierć, choć osobiście nikogo nie zabił.","parentNodeId":"28","siblings":["31","32","33"],"descendants":[]},"35":{"bodyText":"Czesław założył flanelową koszulę jak codzień. Pióro nosi w razie gdyby wpadło mu coś do głowy. W kieszeni spodni trzyma też podręczny notes.","descendants":["37","38","39"],"leadText":"GARSON dostrzega flanelową koszulę i wieczne pióro wystające z kieszonki.","parentNodeId":"29","siblings":["36"]},"36":{"bodyText":"W 1978 roku GARSON wysłał Specsłużbom papiery umożliwiające skazanie i egzekucję znanego wówczas w kraju pisarza -- Andrzeja Motorycznego. Motoryczny był niewinny, ale GARSON bardzo pragnął pobić rekord w liczbie skazanych wrogów narodu.","descendants":["40","41"],"leadText":" GARSONowi przypomina to swojego ostatniego klienta, któremu pomógł wylądować na szafocie.","parentNodeId":"29","siblings":["35"]},"37":{"bodyText":"","leadText":"Czesław założył flanelową koszulę jak codzień.","parentNodeId":"35","siblings":["38","39"],"descendants":[]},"38":{"bodyText":"","leadText":" Pióro nosi w razie gdyby wpadło mu coś do głowy.","parentNodeId":"35","siblings":["37","39"],"descendants":[]},"39":{"bodyText":"","leadText":" W kieszeni spodni trzyma też podręczny notes.","parentNodeId":"35","siblings":["37","38"],"descendants":[]},"40":{"bodyText":"","leadText":"W 1978 roku GARSON wysłał Specsłużbom papiery umożliwiające skazanie i egzekucję znanego wówczas w kraju pisarza -- Andrzeja Motorycznego.","parentNodeId":"36","siblings":["41"],"descendants":[]},"41":{"bodyText":"","leadText":" Motoryczny był niewinny, ale GARSON bardzo pragnął pobić rekord w liczbie skazanych wrogów narodu.","parentNodeId":"36","siblings":["40"],"descendants":[]},"42":{"bodyText":"Zachęcony przez wydawcę Czesław zakłada konto na twitterze. Konto okazuje się być dużym sukcesem -- Czesław bardzo szybko zyskuje wielu followersów i wiele komentarzy. Wiele z tych wielu komentarzy, to obrzydlistwa rzucane w stronę pisarza -- szczególnie jedna osoba daje się Czesławowi we znaki.","descendants":["45","46","47"],"leadText":"Czesław czyta komentarze na swój temat w internecie -- nie są przychylne, szczególnie te nasączone religijną ideą.","parentNodeId":"17","siblings":["43","44"]},"43":{"bodyText":"","leadText":" Zdenerwowany pisarz wsiada w samochód i wjeżdza nim do kościoła.","parentNodeId":"17","siblings":["42","44"],"descendants":[]},"44":{"bodyText":"","leadText":" Szuka zapalniczki, aby spalić swój samochód i ołtarz.","parentNodeId":"17","siblings":["42","43"],"descendants":[]},"45":{"bodyText":"","leadText":"Zachęcony przez wydawcę Czesław zakłada konto na twitterze.","parentNodeId":"42","siblings":["46","47"],"descendants":[]},"46":{"bodyText":"","leadText":" Konto okazuje się być dużym sukcesem -- Czesław bardzo szybko zyskuje wielu followersów i wiele komentarzy.","parentNodeId":"42","siblings":["45","47"],"descendants":[]},"47":{"bodyText":"","leadText":" Wiele z tych wielu komentarzy, to obrzydlistwa rzucane w stronę pisarza -- szczególnie jedna osoba daje się Czesławowi we znaki.","parentNodeId":"42","siblings":["45","46"],"descendants":[]},"61":{"bodyText":"","leadText":"Test!","parentNodeId":"24","descendants":[],"siblings":[]},"root":{"bodyText":"Początkujący pisarz -- Czesław -- tworzy powieść, która niszczy w nim człowieka.","descendants":["1"],"leadText":"Write down the one line description of your story.","siblings":[],"parentNodeId":null}
    }
};

export default function outlineTreeReducer(state = initialState, {
    bodyText,
    dangerousOutlineTree,
    leadText,
    nodeId,
    parentNodeId,
    shouldMoveAfter,
    type
}) {
    switch (type) {
        case actionTypes.MOVE_TO_NODE:
            return caseMoveToOTNodeReducer(state, { nodeId });
        case actionTypes.DANGEROUSLY_RESET_OUTLINE_TREE:
            return caseResetOTReducer(state, { dangerousOutlineTree });
        case actionTypes.SET_OUTLINE_TREE_NODE:
            return caseSetOTNodeReducer(state, {
                nodeId,
                parentNodeId,
                leadText,
                bodyText,
                shouldMoveAfter
            });
        case actionTypes.GENERATE_DESCENDANTS_OF_NODE:
            return caseGenerateOTNodeDescendantsReducer(state, {
                nodeId,
                shouldMoveAfter
            });
        case actionTypes.MOVE_UP:
            return caseMoveUpOTNodeReducer(state);
        case actionTypes.MOVE_DOWN:
            return caseMoveDownOTNodeReducer(state);
        case actionTypes.MOVE_LEFT:
            return caseMoveLeftOTNodeReducer(state);
        case actionTypes.MOVE_RIGHT:
            return caseMoveRightOTNodeReducer(state);
        case actionTypes.REMOVE_NODE_WITH_DESCENDANTS:
            return caseRemoveOTNodeCascReducer(state, { nodeId });
        default:
            return state;
    }
};
