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
        scoresFilter:[-15,15,-100,100] // 主队正偏-客队正偏: 最小值，最大值   主队危险进攻-客队危险进攻：最小值，最大值
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