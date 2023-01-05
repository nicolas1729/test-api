Feature: Pet Name

  Scenario: Get pet
    Given A pet with id 10
    When get pet
    Then The pet name should be doggie
    Then The property status of pet should be available