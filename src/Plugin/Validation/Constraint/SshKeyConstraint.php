<?php

namespace Drupal\sshkey\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Regex constraint.
 *
 * Overrides the symfony constraint to use Drupal-style replacement patterns.
 *
 * @Constraint(
 *   id = "SshKey",
 *   label = @Translation("SSH Key", context = "Validation")
 * )
 */
class SshKeyConstraint extends Constraint {

  /**
   * The message that will be shown if the value is not valid.
   *
   * @var string
   */
  public $message = 'This key is not valid.';

  /**
   * The algorithm in question.
   *
   * @var array
   */
  public $algorithm = [];

  /**
   * {@inheritdoc}
   */
  public function getDefaultOption() {
    return 'algorithm';
  }

  /**
   * {@inheritdoc}
   */
  public function getRequiredOptions() {
    return ['algorithm'];
  }

}
