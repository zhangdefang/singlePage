
export default {
    //获取当前用户名
    getLoginInfo:($this)=>{
        let judeurl = '/pms/commonUtils/rest/UserInfoUtils/getLoginInfo'
        $this.$http.get(judeurl, {})
            .then(res => {
              if (res.status === 200) {
                let data = res.body;
                let account = data.resultValue.account;
                let name = data.resultValue.name;
                let participant_id = data.resultValue.participant_id;
                let type = null;
                if(data.resultValue.type){
                    type = data.resultValue.type;
                }
                let loginTime = data.resultValue.loginTime;
                let lf_area = null;
                if(data.resultValue.lf_area){
                    type = data.resultValue.lf_area;
                }
                return {
                    account:account,
                    name:name,
                    participant_id:participant_id,
                    type:type,
                    loginTime:loginTime,
                    lf_area:lf_area
                };
            }
            else{
                return null;
            }
        });
    }
}