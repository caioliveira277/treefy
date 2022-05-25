import React from 'react';
import { ProfileLayout } from '@/presentation/layouts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Separator } from './styles';
import { ProfileComponent } from './components';
import { ProfileViewModel } from '@/presentation/view-models';
// TODO: remove image after implementation
import temporaryImageProfile from '@assets/images/profile.png';

export interface ProfileViewProps
  extends NativeStackScreenProps<StackParamList, 'Profile'> {
  profileViewModel: ProfileViewModel;
}

export interface ProfileViewState {
  completeName: string;
  viewedArticles: number;
  countFeedback: number;
}

export class ProfileView
  extends React.Component<ProfileViewProps, ProfileViewState>
  implements BaseView<ProfileViewProps>
{
  private profileViewModel: ProfileViewModel;

  constructor(props: ProfileViewProps) {
    super(props);

    const { profileViewModel } = this.props;
    this.profileViewModel = profileViewModel;

    this.state = {
      countFeedback: 0,
      viewedArticles: 0,
      completeName: '',
    };
  }

  public componentDidMount(): void {
    this.profileViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.profileViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      completeName: this.state.completeName,
      countFeedback: this.state.countFeedback,
      viewedArticles: this.state.viewedArticles,
    });
  }

  render() {
    // const { completeName, countFeedback, viewedArticles } = this.state;
    return (
      <ProfileLayout title="Vanessa da Mata" image={temporaryImageProfile}>
        <ProfileComponent />
        <Separator />
      </ProfileLayout>
    );
  }
}
