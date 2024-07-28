async function get_all_teams(){
    const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeams?rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6'   
    
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
    }
}

async function get_qbs_from_team(team) {
    let list_qbs = [];
    try {
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
            return 'ERR: JSON crashed'
        }
    } catch (err) {
        return 'ERR: get all qbs crashed'
    }
}

async function get_week_sch(week) {
    const url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLGamesForWeek?week=${week}&rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6`;    
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
    };
}

async function get_player_data(playerID){
    try {
        let url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerInfo?playerID=${playerID}&rapidapi-key=120902996bmsh0eb2a2d0c126911p14476ajsnda0139ed4fa6`;
    
        const r = await fetch(url);
        if (!r.ok) {
            return 'ERR: failed to get player data';
        }
        const json = await r.json();
        if (json.statusCode===200) {
            console.log(json)
            let espn = json.body.espnLink;
            console.log(espn)
            return espn;
        } else {
            return 'ERR: get player data crashed'
        }
    }catch (err) {
        return 'ERR: failed to get player data'
    }
}

export {get_all_teams,get_qbs_from_team,get_week_sch,get_player_data};
