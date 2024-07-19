import {get_all_qbs,get_week_sch} from './nfl_api.js';

function dis_qbs(d) {
    
    let qbs = get_all_qbs();
    let week = get_week_sch();
    let full_list = add_matchdata(week,qbs);


    d.addEventListener("DOMContentLoaded",() => {
        let main = d.querySelector('#qb_main_div');

        let selections = 0;
        
        full_list.forEach(function (i) {
            main.innerHTML+= `<div class="row">
                <img class="col" src=${i.pic} alt=fail_to_load>
                <div class="col">${i.name}</div>
                <div class="col">${i.team}</div>
                <div class="col">${i.oppt}</div>
                <div class="col">32</div>
                <div class="col"><input type='checkbox' name='select' id=${i.id}></div>
            </div>`
        })

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
        })
    });
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

function add_matchdata(w_data,q_data) {
    let comb = [];

    w_data.forEach(function (w) {
        const h = w.home;
        const a = w.away;
        const d = w.date;
        q_data.forEach(function (q) {
            let j = q;
            j.date = d;
            if(q.team===h) {
                j.oppt = a;
                comb.push(j);
            } else if (q.team===a) {
                j.oppt = `@${h}`;
                comb.push(j);
            }
        })
    })
    return comb;
    /*
    for (const x in w_data) {
        console.log(w_data.x.home)
    }
    for (const key in w_data) {
        let sch = w_data[key]
        console.log(sch);
        console.log(JSON.parse(sch))
        r[sch.away] = `{oppt:${sch.home}}`;
        r[sch.home] = `{oppt:${sch.away}}`;
        console.log(r)
    }*/
    return r;
}

export {dis_qbs}