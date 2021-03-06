export const ADD = 'add';
export const USER_EMAIL = 'User Email';
export const CLOSE = 'Close';
export const ADD_ADMIN = 'Add Admin';
export const ADD_BOOK_COVER = 'Add Book Cover';
export const CANCEL_PREVIEW = 'cancel preview';
export const BOOK_TITLE = 'Book title';
export const AUTHORS_LABEL = 'Author(s)';
export const YEAR_PUBLISHED = 'Year Published';
export const DOWNLOAD_URL = 'Download Url';
export const DESCRIPTION = 'Description';
export const SAVE_CHANGES = 'Save Changes';
export const GENRE = 'Genre';
export const ADD_BOOK = 'Add a Book';
export const EDIT_BOOK = 'Edit Book';

export const FILE = 'file';
export const FOLDER = 'folder';
export const BOOK_STORE = 'bookstore';
export const UPLOAD_PRESET = 'upload_preset';
export const AUTHORS = 'authors';
export const ALL_BOOKS = 'All Books';

// modal closer
export const CLOSE_BOOK = 'close-book';
export const CLOSE_LOGIN = 'close-login';
export const CLOSE_SIGNUP = 'close-signup';
export const CLOSE_USER = 'close-user';

export const SUCCESS = 'success';
export const TOASTR_ERROR = 'error';

export const REVIEW = 'review';
export const REPLY = 'reply';
export const REPLY_EDIT = 'replyEdit';
export const REVIEW_EDIT = 'reviewEdit';
export const REVIEW_WARNING = 'Please leave a review';
export const RATING_WARNING = 'Please leave a rating';
export const REVIEW_SUCCESS = 'Review added successfully';
export const LAST_ELEMENT = 'lastElement';

export const SMOOTH = 'smooth';
export const SCROLL_PARAM = {
  top: 0,
  left: 100,
  behavior: SMOOTH
};
export const SCROLL_TO_PARAM = {
  offset: 500, align: 'middle', duration: 500
};

// dom elements
export const NAV_BAR = 'navbar';
export const LEFT_SIDE_BAR = 'myLeftSideBar';
export const SIDE_NAV = 'mySidenav';
export const SCROLL_TO_ELEMENT = 'scrollToElement';
export const SEARCH_BOX = 'searchBox';
export const MAIN = 'main';

// dom events
export const CLICK = 'click';
export const SCROLL = 'scroll';
export const LOAD = 'load';
export const RESET = 'reset';
export const ONLINE = 'online';
export const OFFLINE = 'offline';
export const STORAGE = 'storage';

// Theme
export const THEME = 'theme';
export const LIGHT = 'light';
export const DARK = 'dark';
export const FLIP_THEME = {
  dark: LIGHT,
  light: DARK,
};
export const THEME_ATTRIBUTE = 'data-theme';

export const TEXT = 'text';
export const PASSWORD_TYPE = 'password';

export const PRODUCTION = 'production';

export const SIDE_BAR_STATUS = 'sideBarStatus';
export const TOKEN = 'token';
export const LOGOUT = 'lorester-books-logout';
export const PREVIOUS_LOCATION = 'previousLocation';

export const AUTH_SUCCESS = 'Authentication successful';

export const MY_BOOKS_PATH = '/my-books';
export const IMAGE_FETCH_ERROR = 'Unable to fetch image';
export const SEARCH_DEBOUNCE_TIME = 1000;
export const VALIDATION_DEBOUNCE_TIME = 1000;

export const FLEX = 'flex';
export const EDIT = 'edit';
export const DELETE = 'delete';
export const REMOVE = 'remove';
export const BLOCK = 'block';
export const NONE = 'none';
export const HIDE = 'hide';
export const SHOW = 'show';
export const OPEN = 'open';
export const AUTO = 'auto';
export const CLOSED = 'closed';
export const USER = 'user';
export const ADMIN = 'admin';

export const NO_CONTENT = 'The content you seek is unavailable';
export const BOOK_SERVER_ERROR = 'Unable to retrieve books from the server please try again';
export const NO_AUTHOR = 'Author unavailable';
export const ADD_TO_FAVORITES = 'Add to Favorites';
export const REMOVE_FROM_FAVORITES = 'Remove from Favorites';
export const RESET_PASSWORD = 'reset-password';
export const VERIFY_EMAIL = 'verify-email';
export const VERIFICATION_MESSAGE = 'Send Verification Mail';
export const RESET_MESSAGE = 'Send Reset Mail';
export const VERIFICATION = 'verification';
export const PASSWORD_RESET = 'password reset';
// export const

// graphql query name
export const REMOVE_FAVORITES_QUERY = 'removeFavoritesQuery';
export const ADD_FAVORITES_QUERY = 'addToFavoritesQuery';

export const ADD_BOOK_QUERY = 'addBookQuery';
export const REMOVE_BOOK_QUERY = 'removeBookQuery';

export const ADD_REVIEW_QUERY = 'addReviewQuery';
export const EDIT_REVIEW_QUERY = 'editReviewQuery';
export const DELETE_REVIEW_QUERY = 'deleteReviewQuery';
export const ADD_REPLY_QUERY = 'addReplyQuery';
export const EDIT_REPLY_QUERY = 'editReplyQuery';
export const DELETE_REPLY_QUERY = 'deleteReplyQuery';
export const TOGGLE_LIKE_QUERY = 'toggleLikeQuery';

export const VERIFY_EMAIL_QUERY = 'verifyEmailQuery';
export const LOGIN_USER_QUERY = 'loginUserQuery';
export const ADD_USER_QUERY = 'addUserQuery';
export const FETCH_USERS_QUERY = 'fetchUsersQuery';
export const TOGGLE_ADMIN_QUERY = 'toggleAdminQuery';
export const RESET_PASSWORD_QUERY = 'resetPasswordQuery';
export const EDIT_PROFILE_QUERY = 'editProfileQuery';
export const CHANGE_PASSWORD_QUERY = 'changePasswordQuery';
export const BOOK_FILTER_QUERY = 'bookFilterQuery';
export const FILTER_USERS_QUERY = 'filterUsersQuery';

export const LEFT_SIDEBAR_NAV_LINKS = [
  {
    key: 0,
    label: 'All Books',
    icon: 'bookmarks',
    link: '/books',
  },
  {
    key: 1,
    label: 'My Books',
    icon: 'book',
    link: '/my-books',
  },
  {
    key: 2,
    label: 'My Favorites',
    icon: 'bookmark',
    link: '/my-favorites',
  },
  {
    key: 3,
    label: 'My Profile',
    icon: 'person',
    link: '/my-profile',
  },
];

export const SIDE_NAV_WIDTH_270 = '270px';
export const SIDE_NAV_WIDTH_70 = '70px';

export const STOP_POLLING_AFTER = 5000;
export const DESTROY_INTERNET_BANNER = 5000;
export const POLL_INTERVAL = 2000;

export const BOOKS_PATH = '/books';

export const RATING_SPECS = {
  1: 'oneStar',
  2: 'twoStar',
  3: 'threeStar',
  4: 'fourStar',
  5: 'fiveStar',
};

export const RATING_STATS = {
  oneStar: {
    rating: 1,
    percentage: 0,
  },
  twoStar: {
    rating: 2,
    percentage: 0,
  },
  threeStar: {
    rating: 3,
    percentage: 0,
  },
  fourStar: {
    rating: 4,
    percentage: 0,
  },
  fiveStar: {
    rating: 5,
    percentage: 0,
  },
};

export const PERCENTAGE_100 = 100;
