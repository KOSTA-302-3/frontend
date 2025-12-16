import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  posts: [],
  reports: [],
  stats: {
    totalUsers: 0,
    totalPosts: 0,
    totalReports: 0,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.stats.totalUsers = action.payload.length;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.stats.totalPosts = action.payload.length;
    },
    setReports: (state, action) => {
      state.reports = action.payload;
      state.stats.totalReports = action.payload.length;
    },
    blockUser: (state, action) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) user.status = 'blocked';
    },
    unblockUser: (state, action) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) user.status = 'active';
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
      state.stats.totalPosts = state.posts.length;
    },
    approveReport: (state, action) => {
      const report = state.reports.find(r => r.id === action.payload);
      if (report) report.status = 'approved';
    },
    rejectReport: (state, action) => {
      const report = state.reports.find(r => r.id === action.payload);
      if (report) report.status = 'rejected';
    },
  },
});

export const {
  setUsers,
  setPosts,
  setReports,
  blockUser,
  unblockUser,
  deletePost,
  approveReport,
  rejectReport,
} = adminSlice.actions;

export default adminSlice.reducer;
