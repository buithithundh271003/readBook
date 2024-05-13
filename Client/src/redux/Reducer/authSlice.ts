import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initialState {
    auth: any;
    loading: boolean;
    error: string | undefined;

}

const initialState: initialState = {
    auth: null,
    loading: false,
    error: "",
};

export const handleLogin = createAsyncThunk(
    "auth/Login",
    async (user: { email: string; password: string }) => {
        const { data } = await axios.post<{ user: any }>(
            "http://localhost:3000/api/signin",
            user
        );

        return data;
    }
);
// pending: AsyncThunkPendingActionCreator<ThunkArg, ThunkApiConfig>:

// Mục đích: Đại diện cho người tạo hành động chịu trách nhiệm gửi một hành động đang chờ xử lý khi Async Thunk được gọi.
// Những điểm chính:
// Tín hiệu cho thấy hoạt động không đồng bộ đã bắt đầu nhưng chưa hoàn thành.
// Thường được sử dụng để cập nhật trạng thái ứng dụng bằng chỉ báo tải hoặc vòng quay để thông báo trực quan cho người dùng.
// Các loại chung:
// ThunkArg: Kiểu dữ liệu của đối số được truyền tới Async Thunk.
// ThunkApiConfig: Tùy chọn cấu hình cho API Async Thunk (ví dụ: chỉ định chức năng điều phối tùy chỉnh hoặc thêm siêu dữ liệu bổ sung).
// 2. rejected: AsyncThunkRejectedActionCreator<ThunkArg, ThunkApiConfig>:

// Mục đích: Đại diện cho người tạo hành động chịu trách nhiệm gửi hành động bị từ chối khi Async thunk gặp lỗi.
// Những điểm chính:
// Tín hiệu cho thấy hoạt động không đồng bộ đã thất bại.
// Thường được sử dụng để cập nhật trạng thái ứng dụng với chi tiết lỗi hoặc hiển thị thông báo lỗi cho người dùng.
// Các loại chung tương tự như pending.
// 3. fulfilled: AsyncThunkFulfilledActionCreator<Returned, ThunkArg, ThunkApiConfig>:

// Mục đích: Đại diện cho người tạo hành động chịu trách nhiệm gửi một hành động đã hoàn thành khi Async Thunk hoàn thành thành công.
// Những điểm chính:
// Tín hiệu cho thấy hoạt động không đồng bộ đã được giải quyết thành công và dữ liệu được yêu cầu đã có sẵn.
// Thường được sử dụng để cập nhật trạng thái ứng dụng với dữ liệu được tìm nạp hoặc kích hoạt các thay đổi giao diện người dùng có liên quan.
// Các loại chung:
// Returned: Kiểu dữ liệu của giá trị được hàm Async Thunk trả về.
// Các loại khác tương tự như pendingvà rejected.
// 4. typePrefix: string:

// Mục đích: Chỉ định tiền tố sẽ được thêm vào các loại hành động cho các hành động được Async Thunk gửi đi (đang chờ xử lý, bị từ chối, đã hoàn thành).
// Những điểm chính:
// Giúp tổ chức các loại hành động trong cửa hàng Redux để hiểu và gỡ lỗi tốt hơ
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authLogout: (state) => {
            state.auth = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.auth = action.payload;
        });
        builder.addCase(handleLogin.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
