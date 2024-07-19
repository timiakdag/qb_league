import {get_all_teams,get_qbs_from_team,get_week_sch} from './nfl_api.js';

function handle_form(d,u_i) {
    let teams_promise = get_all_teams();
    let elig_teams = [];
    let teams = teams_promise.then((teams)=> {
        let count = 0;
        while (count < teams.length) {
            let team = teams[count];
            elig_teams.push(team.abbv);
            count += 1;
        };
        
        if(elig_teams.includes(u_i)) {
            dis_qbs(d,u_i);
        }else {
            console.log('outside')
        }
    }).catch('ERR:');
}

function dis_qbs(d,team) {
    
    let qb_promise = get_qbs_from_team(team);
    qb_promise.then((qbs)=> {
        let week_promise = get_week_sch(1);
        week_promise.then((week) => {
            let full_list = add_matchdata(week,qbs,team);
            console.log(full_list)
            pop_screen(d,full_list)
        })
    }).catch("error");
}

function pop_screen(d,full_list) {
    let main = d.querySelector('#qb_main_div');
    let selections = 0;
    let count = 0;
    while (count < full_list.length) {
        let i = full_list[count];
        main.innerHTML+= `<div class="row">
                <img class="col" src=${i.pic} alt=fail_to_load>
                <div class="col">${i.name}</div>
                <div class="col">${i.team}</div>
                <div class="col">${i.oppt}</div>
                <div class="col">32</div>
                <div class="col"><input type='checkbox' name='select' id=${i.id}></div>
            </div>`;
        count += 1;
    }

    /*
    const rows = d.querySelectorAll('.row');
    rows.forEach((r) => {
                r.addEventListener('click',(e) => {
                    const tar = e.target;
                    if (tar.id) {
                        const chk = tar.checked;
                        if (chk && selections < 2) {
                            selections += 1;
                            d.querySelector('#selected').innerHTML = `${selections}/2`
                    } 

                    if (!chk) {
                        selections -= 1;
                        d.querySelector('#selected').innerHTML = `${selections}/2`
                        enable_checkboxes(rows);
                    }

                    if(selections==2) {
                        disable_checkboxes(rows);
                    }
                } 
            })
        })*/
}

function enable_checkboxes(rows) {
    rows.forEach((r) => {
        const i = r.querySelector('input');
        if (i.disabled) {
            i.disabled = false;
        }
    })
}

function disable_checkboxes(rows) {
    rows.forEach((r) => {
        const i = r.querySelector('input');
        if (!i.checked) {
            i.disabled = true;
        }
    });
}

function add_matchdata(w_data,q_data,team) {
    let comb = []
    
    for (const week of w_data) {
        let json = JSON.parse(week);

        if(json.home === team || json.away === team) {
            for (const qb of q_data) {
                let temp = JSON.parse(qb)
                if(json.home === team) {
                    temp.oppt = json.away
                } 
                if(json.away === team) {
                    temp.oppt = `@${json.home}`
                }
                comb.push(temp)
            }
        }
    }
    return comb;
}

export {handle_form,dis_qbs};