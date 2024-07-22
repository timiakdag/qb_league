async function get_all_teams(){
    const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeams?rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6'

    return [JSON.parse(`{"abbv":"PIT","id":"123"}`),
            JSON.parse(`{"abbv":"NYJ","id":"456"}`),
            JSON.parse(`{"abbv":"LV","id":"789"}`)]
    /*
    try {
        const r = await fetch(url);
        if (!r.ok) {
            return 'ERR: get NFL team API failed';
        }
        const data = await r.json();
        let teams = [];
        if (data.statusCode===200) {
            data.body.forEach(e => {
                teams.push(JSON.parse(`{"abbv":"${e.teamAbv}","id":"${e.teamID}"}`));
            })
            return teams;
        }else {
            return 'ERR: JSON failed NFL team';
        }
    } catch (err) {
        return "ERR: teams call failed";
    }*/
}

async function get_qbs_from_team(team) {
    let list_qbs = [];
    /*
    const url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeamRoster?rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6&teamAbv=${team}`; 
    const r = await fetch(url);
    if (!r.ok) {
        return 'ERR: get all qbs failed';
    }
    const json = await r.json();
   if (json.statusCode===200) {
        let roster = json.body.roster;
        let qbs = roster.filter(function(item){
                return item.pos === 'QB'});
        for (const e of qbs) {
            const [name,team,pic,inj,pos,id] = [e.espnName,e.team,e.espnHeadshot,e.injury,e.pos,e.playerID];
            if (pos==='QB') {
                    list_qbs.push(`{"team":"${team}","pic":"${pic}","name":"${name}","id":"${id}"}`);
            }   
        }
        return list_qbs;
    } else {
            return 'ERR: get all qbs crashed'
    }*/
    
    return [`{"team":"PIT","pic":"https://a.espncdn.com/i/headshots/nfl/players/full/4362887.png","inj":"","name":"Justin Fields","id":"123"}`,
            `{"team":"NYJ","pic":"https://a.espncdn.com/i/headshots/nfl/players/full/8439.png","inj":"","name":"Aaron Rodgers","id":"456"}`,
            `{"team":"LV","pic":"https://a.espncdn.com/i/headshots/nfl/players/full/8444.png","inj":"","name":"Random Guy","id":"789"}`];
}

async function get_week_sch(week) {
    const url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLGamesForWeek?week=${week}&rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6`;
    
    
    return [`{"date":"20240905","away":"BAL","home":"KC","neutral":"False"}`,
            `{"date":"20240906","away":"GB","home":"PHI","neutral":"True"}`,
            `{"date":"20240908","away":"ARI","home":"BUF","neutral":"False"}`,
            `{"date":"20240908","away":"CAR","home":"NO","neutral":"False"}`,
            `{"date":"20240908","away":"DAL","home":"CLE","neutral":"False"}`,
            `{"date":"20240908","away":"DEN","home":"SEA","neutral":"False"}`,
            `{"date":"20240908","away":"HOU","home":"IND","neutral":"False"}`,
            `{"date":"20240908","away":"JAX","home":"MIA","neutral":"False"}`,
            `{"date":"20240908","away":"LAR","home":"DET","neutral":"False"}`,
            `{"date":"20240908","away":"LV","home":"LAC","neutral":"False"}`,
            `{"date":"20240908","away":"MIN","home":"NYG","neutral":"False"}`,
            `{"date":"20240908","away":"NE","home":"CIN","neutral":"False"}`,
            `{"date":"20240908","away":"PIT","home":"ATL","neutral":"False"}`,
            `{"date":"20240908","away":"TEN","home":"CHI","neutral":"False"}`,
            `{"date":"20240908","away":"WSH","home":"TB","neutral":"False"}`,
            `{"date":"20240909","away":"NYJ","home":"SF","neutral":"False"}`]
    /*
    let w = [];
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            return "ERR: API Response invalid get_week";
        }
        const data = await resp.json();
        
        if (data.statusCode === 200) {
            data.body.forEach(e => {
                const [date,away,home,neutral_site,id] = [e.gameDate,e.away,e.home,e.neutralSite,e.gameID];
                w.push(`{"date":"${date}","away":"${away}","home":"${home}","neutral":"${neutral_site}"}`);
            });
            return w;
        }else {
            return 'ERR: json failed qet_week';
        }
    } catch (e) {
        return "ERR: get_week crashed";
    };*/
}

async function get_proj_points(week,playerID){
    let url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLProjections?week=${week}&twoPointConversions=2&passYards=.04&passTD=6&passInterceptions=-2&rushYards=.1&rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6`;
 
    const r = await fetch(url);
        if (!r.ok) {
            return 'ERR: get projected points failed';
        }
        const json = await r.json();
        if (json.statusCode===200) {
            let proj = json.body.playerProjections;
            qb = proj.filter(function(item) {
                return Object.keys(item)===playerID;
            })

            return qb.fantasyPoints

            /*
            for (const e of proj) {
                let key = Object.keys(e);
                if (key===playerID) {
                    return e.key.fantasyPoints;
                }
            }*/
        } else {
            return 'ERR: get points crashed'
        }
}

export {get_all_teams,get_qbs_from_team,get_week_sch,get_proj_points};
