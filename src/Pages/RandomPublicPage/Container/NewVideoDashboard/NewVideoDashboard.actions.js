import * as constants from './NewVideoDashboard.constants';

export const renderOutput = payload => ({type: constants.RENDER_OUTPUT, payload});
export const renderOutputStatus = payload => ({type: constants.RENDER_OUTPUT_STATUS, payload});