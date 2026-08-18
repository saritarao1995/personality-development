import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../store/selectors/authSelectors';
import ColorThemePicker from './ColorThemePicker';

/** Color theme picker — visible only for admin users */
const AdminColorThemePicker = () => {
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAdmin) return null;

  return <ColorThemePicker />;
};

export default AdminColorThemePicker;
