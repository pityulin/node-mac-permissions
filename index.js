const nonMacResponse = () => undefined
const stub = {
  askForCalendarAccess: nonMacResponse,
  askForContactsAccess: nonMacResponse,
  askForFoldersAccess: nonMacResponse,
  askForFullDiskAccess: nonMacResponse,
  askForRemindersAccess: nonMacResponse,
  askForCameraAccess: nonMacResponse,
  askForMicrophoneAccess: nonMacResponse,
  askForPhotosAccess: nonMacResponse,
  askForSpeechRecognitionAccess: nonMacResponse,
  askForScreenCaptureAccess: nonMacResponse,
  askForAccessibilityAccess: nonMacResponse,
  getAuthStatus: nonMacResponse,
}

const os = require('os')
const permissions = os.platform() === 'darwin' ? require('bindings')('permissions.node') : stub

function getAuthStatus(type) {
  const validTypes = [
    'accessibility',
    'bluetooth',
    'calendar',
    'camera',
    'contacts',
    'full-disk-access',
    'input-monitoring',
    'location',
    'microphone',
    'music-library',
    'photos',
    'reminders',
    'speech-recognition',
    'screen',
  ]

  if (!validTypes.includes(type)) {
    throw new TypeError(`${type} is not a valid type`)
  }

  return permissions.getAuthStatus.call(this, type)
}

function askForFoldersAccess(folder) {
  const validFolders = ['desktop', 'documents', 'downloads']

  if (!validFolders.includes(folder)) {
    throw new TypeError(`${folder} is not a valid protected folder`)
  }

  return permissions.askForFoldersAccess.call(this, folder)
}

module.exports = {
  ...permissions,
  askForFoldersAccess,
  getAuthStatus,
}