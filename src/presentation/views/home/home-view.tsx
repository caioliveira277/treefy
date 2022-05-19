import React from 'react';
import { HomeViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { SearchInputComponent, SalutationComponent } from './components';
import { Container } from './styles';

export interface HomeViewProps
  extends NativeStackScreenProps<StackParamList, 'Home'> {
  homeViewModel: HomeViewModel;
}

export interface HomeViewState {}

export class HomeView
  extends React.Component<HomeViewProps, HomeViewState>
  implements BaseView<HomeViewProps>
{
  private homeViewModel: HomeViewModel;

  constructor(props: HomeViewProps) {
    super(props);

    const { homeViewModel } = this.props;
    this.homeViewModel = homeViewModel;
  }

  public componentDidMount(): void {
    this.homeViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.homeViewModel.detachView();
  }

  onViewModelChanged(): void {}

  render() {
    return (
      <Container>
        <SalutationComponent />
        <SearchInputComponent />
      </Container>
    );
  }
}
