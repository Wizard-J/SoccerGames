export const switchFilter = function(data){
    return {
        type: 'SWITCH_FILTER',
        data
    }
}

export function reducer(
    state={
        filterOn : true,
        dataScope : [0,100],
        filtGames:true,
        leagueList:[],
        showLeagues:[],
        scoresFilter:[0,0,0,-100] // 比分筛选功能
    },action){

    let data = action.data;
    switch (action.type) {
        case 'SWITCH_FILTER':
            for(let i in data){
                state[i] = data[i];
            }
            return state;
        default:
            return state;
    }
}