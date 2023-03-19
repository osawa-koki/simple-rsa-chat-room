type SharedData = {
  username: string;
  message: string;
  public_n: number;
  public_e: number;
  private_n: number;
  private_d: number;
  key_sets: KeySets[];
};

type KeySets = {
  public_n: number;
  public_e: number;
  private_n: number;
  private_d: number;
};

export default SharedData;
export type { KeySets };
