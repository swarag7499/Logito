export const ProfileActionType = {
    GET_PROFILE: 'GET_PROFILE',
    PROFILE_PENDING: 'PROFILE_PENDING',
    PROFILE_ERROR: 'PROFILE_ERROR'
}

export const getProfile = profile => ({
    type: ProfileActionType.GET_PROFILE,
    profile,
});

export const profilesError = error => ({
    type: ProfileActionType.PROFILE_ERROR,
    error,
});

export const profilesPending = () => ({
    type: ProfileActionType.PROFILE_PENDING,
});