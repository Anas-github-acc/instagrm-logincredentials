export interface Database {
  public: {
    Tables: {
      insta_credentials :{
        Row: {
          id: number
          email: string
          password: string
        }
        Insert: {
          id?: never
          email? : string | null
          password? : string | null
        }
      }
    }
  }
}