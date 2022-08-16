import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RemoteSignup, RemoteAuthentication } from '@/data/usecases';
import { AWSCognitoIdentityProvider } from '@/infra/aws';
import {
  AuthenticationView,
  AccessView,
  EmailConfirmationView,
  ChangePasswordView,
  SignupView,
  IntrodutionView,
  CodeConfirmationView,
} from '@/presentation/views';
import {
  AuthenticationViewModelImpl,
  AccessViewModelImpl,
  EmailConfirmationViewModelImpl,
  ChangePasswordViewModelImpl,
  SignupViewModelImpl,
  IntroductionViewModelImpl,
  CodeConfirmationViewModelImpl,
} from '@/presentation/view-models';
import { CompositeValidator, BuilderValidator } from '@/validations';

const Stack = createNativeStackNavigator<StackParamList>();

export const PublicRoutes: React.FC = () => {
  const authenticationViewModel = new AuthenticationViewModelImpl(
    new RemoteAuthentication(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('email').required().email().build(),
      ...BuilderValidator.field('password').required().build(),
    ])
  );
  const accessViewModel = new AccessViewModelImpl();
  const emailConfirmationViewModel = new EmailConfirmationViewModelImpl(
    new RemoteAuthentication(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('email').required().email().build(),
    ])
  );
  const changePasswordViewModel = new ChangePasswordViewModelImpl(
    new RemoteAuthentication(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('password')
        .required()
        .minLength(5)
        .containsLowercase()
        .containsUppercase()
        .containsNumber()
        .build(),
      ...BuilderValidator.field('confirmPassword')
        .required()
        .sameAs('password', 'Senha')
        .build(),
    ])
  );
  const signupViewModel = new SignupViewModelImpl(
    new RemoteSignup(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('completeName')
        .required()
        .completeName()
        .build(),
      ...BuilderValidator.field('email').required().email().build(),
      ...BuilderValidator.field('password')
        .required()
        .minLength(5)
        .containsLowercase()
        .containsUppercase()
        .containsNumber()
        .build(),
      ...BuilderValidator.field('confirmPassword')
        .required()
        .sameAs('password', 'Senha')
        .build(),
    ])
  );
  const introductionViewModel = new IntroductionViewModelImpl();
  const codeConfirmationViewModel = new CodeConfirmationViewModelImpl(
    new RemoteSignup(AWSCognitoIdentityProvider),
    new RemoteAuthentication(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('code').required().minLength(5).build(),
    ])
  );
  return (
    <Stack.Navigator
      initialRouteName="Introduction"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Introduction">
        {(props) => (
          <IntrodutionView
            {...props}
            introductionViewModel={introductionViewModel}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Access">
        {(props) => <AccessView {...props} accessViewModel={accessViewModel} />}
      </Stack.Screen>
      <Stack.Screen name="Authentication">
        {(props) => (
          <AuthenticationView
            {...props}
            authenticationViewModel={authenticationViewModel}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="EmailConfirmation">
        {(props) => (
          <EmailConfirmationView
            {...props}
            emailConfirmationViewModel={emailConfirmationViewModel}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ChangePassword">
        {(props) => (
          <ChangePasswordView
            {...props}
            changePasswordViewModel={changePasswordViewModel}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {(props) => <SignupView {...props} signupViewModel={signupViewModel} />}
      </Stack.Screen>
      <Stack.Screen name="CodeConfirmation">
        {(props) => (
          <CodeConfirmationView
            {...props}
            codeConfirmationViewModel={codeConfirmationViewModel}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
