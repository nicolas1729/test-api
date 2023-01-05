import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { fetchApi } from '../fetchApi'
import { components } from "./../types/petstore"

type Pet = components["schemas"]["Pet"];

@binding()
export class BankAccountSteps {
  private petId: number = 0;
  
  private pet: Pet;

  @given(/A pet with id (\d*)/)
  public givenAPetWithId(petId: number) {
    this.petId = petId;
  }

  @when(/get pet/)
  public async get() {
    const response = await fetchApi("https://petstore3.swagger.io/api/v3", "/pet/{petId}", {method: "get", params: {petId: this.petId}});
    this.pet = response;
  }

  @then(/The pet name should be (\w*)/)
  public nameShouldEqual(petName: string) {
    assert.equal(this.pet.name, petName);
  }

  @then(/The property (\w*) of pet should be (\w*)/)
  public propertyShouldEqual(property: string, petName: string) {
    let petProperty = property as keyof Pet;
    assert.equal(this.pet[petProperty], petName);
  }

}