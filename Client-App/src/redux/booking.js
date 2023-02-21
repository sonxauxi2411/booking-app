import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    total: 0,
    rooms: [],
  },
  reducers: {
    addRooms(state, action) {
      const checked = action.payload.checked;
      const room = action.payload.value;
      const price = action.payload.price;
      const day = action.payload.day || 1;
      const roomId = action.payload.roomId;

      // console.log(action.payload);
      const findRoomIndex = state.rooms.findIndex((i) => i.room_id === roomId);
      if (checked) {
        if (findRoomIndex >= 0) {
          state.rooms[findRoomIndex].roomNumbers.push(room);
        } else {
          state.rooms = [
            ...state.rooms,
            { room_id: roomId, roomNumbers: [room] },
          ];
        }

        state.total = price * day + state.total;
      } else {
        if (findRoomIndex >= 0) {
          state.rooms[findRoomIndex].roomNumbers = state.rooms[
            findRoomIndex
          ].roomNumbers.filter((i) => i !== room);
        }
        state.total = state.total - price * day;
      }

      //console.log(state.total);
    },
  },
  resetBooking(state, action) {
    state.total = 0;
    state.rooms = [];
  },
});

export const bookingActions = bookingSlice.actions;

export default bookingSlice.reducer;
