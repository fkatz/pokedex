import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRetrievePokemonNames } from '../../hooks/useRetrievePokemonNames';
import { useUserMadePokemon } from '../../hooks/useUserMadePokemon';
import { PokemonDetails } from '../../types/PokemonDetails';
import { Modal } from '../Modal';
import { Form, FormControl, Textarea } from './styles';

const UserMadePokemonEditor = ({
  open,
  onClose,
  currentPokemon,
}: {
  open: boolean;
  onClose: () => void;
  currentPokemon?: PokemonDetails;
}) => {
  const { userMadePokemonNames } = useRetrievePokemonNames();
  const { createPokemon, modifyPokemon } = useUserMadePokemon();

  const defaultValues = useMemo(
    () => ({
      ...currentPokemon,
      moves: currentPokemon?.moves.join('\n'),
      types: currentPokemon?.types.join('\n'),
    }),
    [currentPokemon],
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'all',
  });
  const onSubmit: Parameters<typeof handleSubmit>[0] = (data) => {
    const newPokemonDetails: PokemonDetails = {
      name: data.name!,
      sprite: data.sprite!,
      height: data.height!,
      weight: data.weight!,
      isLegendary: data.isLegendary!,
      ...(data.evolvesFrom && { evolvesFrom: data.evolvesFrom }),
      types: data.types?.split('\n') || [],
      moves: data.moves?.split('\n') || [],
      description: data.description!,
    };
    currentPokemon
      ? modifyPokemon(newPokemonDetails, currentPokemon.name)
      : createPokemon(newPokemonDetails);
    onClose();
  };

  const renderErrors = (name: keyof typeof errors) => (
    <>
      {errors[name]?.type === 'required' && <p>This field is required</p>}
      {errors[name]?.type === 'repeated' && <p>This field must be unique</p>}
    </>
  );
  return (
    <Modal onClose={onClose} open={open}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <label>Name</label>
          <input
            className="nes-input"
            {...register('name', {
              required: true,
              validate: {
                repeated: (name) =>
                  !name ||
                  (!!name && !userMadePokemonNames.includes(name)) ||
                  (!!currentPokemon && !!name && currentPokemon.name === name),
              },
            })}
          />
          {renderErrors('name')}
        </FormControl>
        <FormControl>
          <label>Sprite URL</label>
          <input className="nes-input" {...register('sprite', { required: true })} />
          {renderErrors('sprite')}
        </FormControl>
        <FormControl>
          <label>Height</label>
          <input
            className="nes-input"
            type="number"
            min={0}
            {...register('height', { required: true })}
          />
          {renderErrors('height')}
        </FormControl>
        <FormControl>
          <label>Weight</label>
          <input
            className="nes-input"
            type="number"
            min={0}
            {...register('weight', { required: true })}
          />
          {renderErrors('weight')}
        </FormControl>
        <FormControl>
          <label>Types (Write each one in in a single line)</label>
          <Textarea rows={2} className="nes-input" {...register('types', { required: true })} />
          {renderErrors('types')}
        </FormControl>
        <FormControl>
          <label>
            <input type="checkbox" className="nes-checkbox" {...register('isLegendary')} />
            <span>Is legendary</span>
          </label>
        </FormControl>
        <FormControl>
          <label>Evolves from</label>
          <input className="nes-input" {...register('evolvesFrom')} />
        </FormControl>
        <FormControl>
          <label>Description</label>
          <Textarea
            rows={4}
            className="nes-input"
            {...register('description', { required: true })}
          />
          {renderErrors('description')}
        </FormControl>
        <FormControl>
          <label>Moves (Write each one in in a single line)</label>
          <Textarea rows={5} className="nes-input" {...register('moves', { required: true })} />
          {renderErrors('moves')}
        </FormControl>
        <button className="nes-btn">Save and close</button>
      </Form>
    </Modal>
  );
};

export default UserMadePokemonEditor;
