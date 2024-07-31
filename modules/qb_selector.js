import {get_all_teams,get_qbs_from_team,get_week_sch,get_player_data} from './nfl_api.js';
const add_inline = function(item){
    item.classList.add('show_inline_sel');
}
const rem_inline = function(item){
    item.classList.remove('show_inline_sel');
}
const add_hidden = function(item){
    item.classList.add('hidden_sel');
}
const rem_hidden = function(item){
    item.classList.remove('hidden_sel');
}
const rem_flex = function(item){
    item.classList.remove('show_flex_sel')
}

function handle_form(d,u_i,week,elig_teams) {
    let loader = d.querySelector('.load_window');
    let error = d.querySelector('.error_msg');
    let info = d.querySelector('.info');
    
    if(elig_teams.includes(u_i)) {
        rem_inline(error);
        add_hidden(error);
        rem_hidden(info)
        dis_qbs(d,u_i,week,loader);
    }else {
        add_hidden(info);
        rem_hidden(error);
        add_inline(error);
        rem_flex(loader);
        add_hidden(loader);
    }
}

function dis_qbs(d,team,week,loader) {
    
    let qb_promise = get_qbs_from_team(team);
    qb_promise.then((qbs)=> {
        let week_promise = get_week_sch(week);
        week_promise.then((w) => {
            let full_list = add_matchdata(w,qbs,team);
            pop_screen(d,full_list,week);
            rem_flex(loader);
            add_hidden(loader);
        })
    }).catch((err) => {
        rem_flex(loader);
        add_hidden(loader);
        err_msg(err)
    });
}

function pop_screen(d,full_list,week) {
    let main = d.querySelector('#qb_main_div');
    let count = 0;
    if (full_list.length>0){
        while (count < full_list.length) {
            let i = full_list[count];
            let c = i.name.split(" ").join("");
            main.innerHTML+= `<div class="sel_row">
                    <img class="col" src=${i.pic} alt=fail_to_load>
                    <div class="col">${i.name}</div>
                    <div class="col">${i.team}</div>
                    <div class="col">${i.oppt}</div>
                    <div class="col"><input type='checkbox' name='select' class=${c} id=${i.id}></div>
                </div>`;
            count += 1;
        }
    
        const rows = d.querySelectorAll('.sel_row');
        const mag_glass = d.querySelector('.mag_tip_text');
        rows.forEach((r) => {
            r.addEventListener('click',(e) => {
                const tar = e.target;
                if (tar.id) {
                    const chk = tar.checked;
                    let mag = d.querySelector('.mag');
                    
                    if (chk) {
                        disable_checkboxes(rows);
                        rem_hidden(mag);
                        let espn_promise = get_player_data(tar.id);
                        espn_promise.then((espn_link) => {
                            mag_glass.innerHTML = `<a href=${espn_link}>See ESPN bio</a>`;
                        }).catch((err) => {
                            err_msg(err)
                        }) 
                    } 
    
                    if (!chk) {
                        enable_checkboxes(rows);
                        add_hidden(mag);
                        mag_glass.innerHTML = "";
                    }
                } 
            });
        })
    } else {
        main.innerHTML += `<p>This team is on bye in week ${week}.  Enter a different week.</p>`
    }
}

function err_msg(err){
    alert(err)
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
                if(json.neutral==='True'){
                    temp.oppt += ' (neutral site)'
                }
                comb.push(temp)
            }
        }
    }
    return comb;
}

export {handle_form,dis_qbs};