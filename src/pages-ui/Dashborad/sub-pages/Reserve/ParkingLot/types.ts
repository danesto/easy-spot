import styles from './parking-lot.module.scss';

enum ReservationTypes {
  ReservedByMe = 'RESERVED_BY_ME',
  ReservedByOther = 'RESERVED_BY_OTHER',
  NotReserved = 'NOT_RESERVED',
}

const reservationTypesMap = {
  [ReservationTypes.ReservedByMe]: {
    buttonLabel: 'Release',
    cardClassName: styles.reservedByMe,
    buttonColorScheme: 'red',
    isButtonDisabled: false,
  },
  [ReservationTypes.ReservedByOther]: {
    buttonLabel: 'Unavailable',
    cardClassName: styles.reservedByOther,
    buttonColorScheme: 'gray',
    isButtonDisabled: true,
  },
  [ReservationTypes.NotReserved]: {
    buttonLabel: 'Reserve',
    cardClassName: styles.notReserved,
    buttonColorScheme: 'blue',
    isButtonDisabled: false,
  },
};

export { ReservationTypes, reservationTypesMap };
