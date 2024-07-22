import {get_all_teams,get_qbs_from_team,get_week_sch} from './nfl_api.js';

function handle_form(d,u_i) {
    let loader = d.querySelector('.load_window');
    let error = d.querySelector('.error_msg');
    let info = d.querySelector('.info');
    
    loader.classList.remove('hidden_sel');
    loader.classList.add('show_flex_sel');

    let teams_promise = get_all_teams();
    let elig_teams = [];
    teams_promise.then((teams)=> {
        let count = 0;
        while (count < teams.length) {
            let team = teams[count];
            elig_teams.push(team.abbv);
            count += 1;
        };
        
        console.log(u_i);
        if(elig_teams.includes(u_i)) {
            error.classList.remove('.show_inline_sel');
            error.classList.add('hidden_sel');
            
            info.classList.remove('hidden_sel');
            dis_qbs(d,u_i);
            loader.classList.remove('show_flex_sel');
            loader.classList.add('hidden_sel');
            
        }else {
            info.classList.add('hidden_sel');
            error.classList.remove('hidden_sel');
            error.classList.add('.show_inline_sel');
            loader.classList.remove('show_flex_sel');
            loader.classList.add('hidden_sel');
        }
    }).catch((err) => {alert(err)});
}

function dis_qbs(d,team) {
    
    let qb_promise = get_qbs_from_team(team);
    qb_promise.then((qbs)=> {
        let week_promise = get_week_sch(1);
        week_promise.then((week) => {
            let full_list = add_matchdata(week,qbs,team);
            pop_screen(d,full_list);
        })
    }).catch("error");
}

function pop_screen(d,full_list) {
    let main = d.querySelector('#qb_main_div');
    let selections = 0;
    let count = 0;
    main.innerHTML="";
    while (count < full_list.length) {
        let i = full_list[count];
        main.innerHTML+= `<div class="sel_row">
                <img class="col" src=${i.pic} alt=fail_to_load>
                <div class="col">${i.name}</div>
                <div class="col">${i.team}</div>
                <div class="col">${i.oppt}</div>
                <div class="col"><input type='checkbox' name='select' id=${i.id}></div>
            </div>`;
        count += 1;
    }

    const rows = d.querySelectorAll('.sel_row');
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
    })
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
                console.log(qb)
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