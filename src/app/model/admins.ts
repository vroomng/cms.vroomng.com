export interface IAdmin {
      uuid: number
      email: string
      firstname: string
      lastname: any,
      phone_no: any,
      user_type: any,
      ref_code: string
    }
export interface IQuest {
    uuid: string
    title: string
    subTitle: string
    icon: string
    type: string
    points: string
    target: string
    starts: string
    expires: string
  }
  
    
    
    export interface IAccessTrail {
      ID: number
      login: string
      action: string
      access_time: string
    }
    
