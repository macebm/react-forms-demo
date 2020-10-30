import { useState } from 'react'
import styled from 'styled-components/macro'
import Tags from './Tags'

export default function Form() {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    toc: false,
    tags: [],
  })

  function register(event) {
    event.preventDefault()
    console.log(userProfile, 'current profile state')

    if (validRegistration(userProfile)) {
      console.log(userProfile, 'Send this!')
    } else {
      alert('Please check the form and accept our TOC')
    }
  }

  function handleInputChange(event) {
    const fieldName = event.target.name
    const fieldValue =
      fieldName === 'toc' ? event.target.checked : event.target.value
    console.log(fieldValue)
    setUserProfile({ ...userProfile, [fieldName]: fieldValue })
  }

  function updateTags(tag) {
    setUserProfile({
      ...userProfile,
      tags: [...userProfile.tags, tag],
    })
  }

  return (
    <RegisterForm onSubmit={register}>
      <h1>Registration</h1>

      <Fieldset>
        <div>
          <label htmlFor="firstname">
            <strong>First name</strong>
          </label>
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            value={userProfile.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastname">
            <strong>Last name</strong>
          </label>
          <input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            value={userProfile.lastName}
          />
        </div>
      </Fieldset>

      <div>
        <label htmlFor="email">
          <strong>Email</strong>
        </label>
        <input
          type="text"
          name="email"
          onChange={handleInputChange}
          value={userProfile.email}
        />
      </div>

      <h4>Gender</h4>
      <Fieldset>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleInputChange}
            checked={userProfile.gender === 'male'}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleInputChange}
            checked={userProfile.gender === 'female'}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="diverse"
            onChange={handleInputChange}
            checked={userProfile.gender === 'diverse'}
          />
          Diverse
        </label>
      </Fieldset>
      <TermsAndConditions>
        <label>
          <input
            type="checkbox"
            name="toc"
            onChange={handleInputChange}
            checked={userProfile.toc}
          />
          Accept Terms and Conditions
        </label>
      </TermsAndConditions>
      <Tags
        tags={userProfile.tags}
        onUpdateTags={updateTags}
        headline="Your interests"
      />
      <Button>Register</Button>
    </RegisterForm>
  )
}

const validateName = ({ firstName, lastName }) =>
  firstName.length >= 2 && lastName.length >= 2

const validateEmail = ({ email }) =>
  email.includes('@') && hasValidEmailDomain(email)

const hasValidEmailDomain = (email) => {
  const parts = email.split('.')
  return parts[parts.length - 1].length >= 2
}

const tocAccepted = ({ toc }) => toc === true

const validRegistration = (userProfile) =>
  validateName(userProfile) &&
  validateEmail(userProfile) &&
  tocAccepted(userProfile)

const RegisterForm = styled.form`
  max-width: 32rem;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  font-family: sans-serif;

  h1 {
    color: #2ddcb4;
  }

  h4 {
    margin-bottom: 0;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  input {
    font-size: 1.25rem;
    padding: 0.25rem;
  }

  input[type='radio'],
  input[type='checkbox'] {
    margin-left: 0;
    transform: scale(1.5);
    margin-right: 0.75rem;
  }
`

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
`

const Button = styled.button`
  color: white;
  background-color: #1b7e64;
  padding: 9px 20px 11px;
  font-size: 1.25rem;
  border-radius: 5px;
  border: none;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
`

const TermsAndConditions = styled.div`
  margin: 1rem 0;
`
