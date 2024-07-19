function get_all_qbs() {
    const url = "https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerList?rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6";
    
    return [{team:"PIT",pic:"https://a.espncdn.com/i/headshots/nfl/players/full/4362887.png",inj:"",name:"Justin Fields",id:'123'},
            {team:"NYJ",pic:"https://a.espncdn.com/i/headshots/nfl/players/full/8439.png",inj:"",name:"Aaron Rodgers",id:'456'},
            {team:"LV",pic:"https://a.espncdn.com/i/headshots/nfl/players/full/8444.png",inj:"",name:"Random Guy",id:'789'}];
    /*
    try {
     const promise = await get_qbs(url);
     promise.then((qb_data) => {return qb_data}).catch((err) => {return "Error"})
  */
}

async function get_qbs(url) {
    let list_qbs = []

    try {
        const r = await fetch(url);
        if (! r.ok) {
            return "error";
        }
        const data = await r.json();
        if (data.statusCode===200) {
            data.body.forEach(e => {
                const [name,team,pic,inj,pos,id] = [e.espnName,e.team,e.espnHeadshot,e.injury,e.pos,e.playerID]
                if (pos==="QB") {
                    list_qbs.push(`{team:${team},pic:${pic},inj:${inj},name:${name},id:${id}}`);
                }
            });
            return list_qbs;
        } else {
            //ErrorObserver.observe -> collection of things interested in errors.  
            return 'Error';
        }
    } catch (err) {
        return err;
    }
}

async function get_week_sch(week) {
    const url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLGamesForWeek?week=${week}&rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6`;
    
    return [{date:"20240905",away:"BAL",home:"KC",neutral:"False"},
            {date:"20240906",away:"GB",home:"PHI",neutral:"True"},
            {date:"20240908",away:"ARI",home:"BUF",neutral:"False"},
            {date:"20240908",away:"CAR",home:"NO",neutral:"False"},
            {date:"20240908",away:"DAL",home:"CLE",neutral:"False"},
            {date:"20240908",away:"DEN",home:"SEA",neutral:"False"},
            {date:"20240908",away:"HOU",home:"IND",neutral:"False"},
            {date:"20240908",away:"JAX",home:"MIA",neutral:"False"},
            {date:"20240908",away:"LAR",home:"DET",neutral:"False"},
            {date:"20240908",away:"LV",home:"LAC",neutral:"False"},
            {date:"20240908",away:"MIN",home:"NYG",neutral:"False"},
            {date:"20240908",away:"NE",home:"CIN",neutral:"False"},
            {date:"20240908",away:"PIT",home:"ATL",neutral:"False"},
            {date:"20240908",away:"TEN",home:"CHI",neutral:"False"},
            {date:"20240908",away:"WSH",home:"TB",neutral:"False"},
            {date:"20240909",away:"NYJ",home:"SF",neutral:"False"}]
    /*
        const promise = await get_week_sch_api(url);
        promise.then((week) => {return week}).catch((error) => {return "error"}) */
}

async function get_week_sch_api(url) {
    let w = {}
    try {
        const resp = await fetch(url);
        
        if (!resp.ok) {
            return undefined;
        }
        const data = await resp.json();

        if (data.statusCode === 200) {
            data.body.forEach(e => {
                const [date,away,home,neutral_site,id] = [e.gameDate,e.away,e.home,e.neutralSite,e.gameID];
                w.push(`{date:${date},away:${away},home:${home},neutral:${neutral_site}}`);
            });
            return w;
        }else {
            return undefined;
        }
    } catch (e) {
        return "error";
    }
}


export {get_all_qbs,get_week_sch};
