
export default {
    //根据电厂id获取省市id
    getAreaIdByParticipantId:(id)=>{
        let param = {
            participantId: id
        };
        let judeurl = '/pms/commonUtils/rest/MarketMembersUtils/getAreaIdByParticipantId';
        this.$http.get(judeurl, {params:param})
            .then(res => {
              if (res.status === 200) {
                let data = res.body;
                let areaId = data.resultValue.areaId;
                return areaId;
            }
            else{
                return null;
            }
        });
    },

    //根据机组id获取省市id
    getAreaIdByPhyunitId:(id)=>{
        let param = {
            phyunitId: id
        };
        let judeurl = '/pms/commonUtils/rest/MarketMembersUtils/getAreaIdByPhyunitId';
        this.$http.get(judeurl, {params:param})
            .then(res => {
              if (res.status === 200) {
                let data = res.body;
                let areaId = data.resultValue.areaId;
                return areaId;
            }
            else{
                return null;
            }
        });
    },

    //根据机组id获取电厂id
    getParticipantIdByPhyunitId:(id)=>{
        let param = {
            phyunitId: id
        };
        let judeurl = '/pms/commonUtils/rest/MarketMembersUtils/getParticipantIdByPhyunitId';
        this.$http.get(judeurl, {params:param})
            .then(res => {
              if (res.status === 200) {
                let data = res.body;
                let participantId = data.resultValue.participantId;
                return participantId;
            }
            else{
                return null;
            }
        });
    }
}