
export interface IVehicleType {
        uuid: string
        vehicle_type: string
        per_km_rate: string
        per_minute_rate: string
        base_fare: string
        tolls_fees: string
        minimum_fare: string
        tax_percent: string
        commission: string
        cancel_charge_driver: string
        cancel_charge_rider: string
        available_seat: string
        description: string
        is_active: string
        trip_type: string
        peek_hour_fare: string
        make: string
        model: string
        year: string
        vehicle_image: any
        per_km_rate_share: string
        per_minute_rate_share: string
        minimum_fare_share: string
        base_fare_share: string
        promo_status: string
        max_fare_value: string
        created_at: string
        updated_at: string
      }

      export interface IVehicleMake {
        id: number
        uuid: string
        title: string
        description: string
        created_at: string
        updated_at: string
      }
      
      

export interface addVehicle {
        vehicle_type: string | null;
        trip_type: string  | null; 
        per_km_rate: string  | null;
        minimum_fare: string  | null;
        commission: string  | null;
        available_seat: string  | null;
        cancel_charge_driver: string  | null;
        cancel_charge_rider: string  | null;
        isactive: string  | null;
        description: string  | null;
        per_minute_rate: string  | null;
        base_fare: string  | null;
        tolls_fees: string  | null;
        peek_hour_fare: string  | null;
        make: string  | null;
        model: string  | null;
        year: string  | null;
        vehicle_image: string  | null;
      }
      